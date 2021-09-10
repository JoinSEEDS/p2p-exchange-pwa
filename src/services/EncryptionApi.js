import BaseEosApi from './BaseEosApi'
import { Contracts } from '../const/Contracts'
const escrow = Contracts.CONTRACT_P2P

const { KeyType } = require('eosjs/dist/eosjs-numeric')
import { PublicKey } from 'eosjs/dist/PublicKey'
import { PrivateKey } from 'eosjs/dist/PrivateKey'

const crypto = require('crypto')
import shajs from 'sha.js'
// import { tmpdir } from 'os'
const EC = require('elliptic').ec

class EncryptionApi extends BaseEosApi {
  constructor ({
    eosApi,
    notifier
  }) {
    super(
      eosApi,
      notifier,
      {
        contractAccount: Contracts.CONTRACT_P2P,
        table: 'userspkeys',
        tableId: 'account',
        defaultSortField: 'account'
      }
    )
  }

  /** *
  * Parse transfers base
  */
  async _parseRows (rows, modifierProps) {
    return rows
  }

  async generateKeys () {
    const ephemKey = new EC('secp256k1').genKeyPair()
    const ephemPublicKey = PublicKey.fromElliptic(ephemKey, KeyType.k1).toString()
    let priv = PrivateKey.fromElliptic(ephemKey, KeyType.k1).toString()

    return { privateKey: priv, publicKey: ephemPublicKey }
  }

  async getPublicKey ({ accountName }) {
    const { rows } = await this.fetchByIndex({
      scope: Contracts.CONTRACT_P2P,
      indexPosition: 1,
      indexValue: accountName
    })

    return rows[0].public_key
  }

  async createMessage ({
    privateKey,
    recipientAccount,
    message,
    buyOfferId
  }) {
    let rcptKey = null

    privateKey = PrivateKey.fromString(privateKey).toElliptic() // <<- Eliptic from string of sender private key

    const { rows } = await this.fetchByIndex({
      scope: Contracts.CONTRACT_P2P,
      indexPosition: 1,
      indexValue: recipientAccount
    })
    rcptKey = rows[0].public_key // <<- Recipent public key
    rcptKey = PublicKey.fromString(rcptKey).toElliptic()

    // create the ephemeral key pair
    const ephemKey = new EC('secp256k1').genKeyPair()
    const ephemPublicKey = PublicKey.fromElliptic(ephemKey, KeyType.k1)

    // obtaining the shared secret
    const shared = Buffer.from(ephemKey.derive(rcptKey.getPublic()).toString('hex'), 'hex')
    // eslint-disable-next-line new-cap
    const hash = new shajs.sha512().update(shared).digest()

    let iv = crypto.randomBytes(16) // initialization vector
    let encryptionKey = hash.slice(0, 32)
    let macKey = hash.slice(32)

    let cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv)
    let firstChunk = cipher.update(message)
    let secondChunk = cipher.final()
    let ciphertext = Buffer.concat([firstChunk, secondChunk])

    let dataToMac = Buffer.concat(
      [
        Buffer.from(iv.buffer, 'hex'),
        Buffer.from(ephemPublicKey.key.data.buffer, 'hex'),
        Buffer.from(ciphertext.buffer, 'hex')
      ]
    )
    let mac = crypto.createHmac('sha256', macKey).update(dataToMac).digest()

    return {
      buy_offer_id: buyOfferId,
      iv: iv.toString('hex'),
      ephem_key: ephemPublicKey.toString(),
      message: ciphertext.toString('hex'),
      mac: mac.toString('hex')
    }
  }

  async receiveMessage ({
    recipientPrivateKey,
    buyOfferId,
    arbiter
  }) {
    // eslint-disable-next-line no-undef
    let idxValue = BigInt(BigInt(buyOfferId) * BigInt(2 ** 64)).toString()
    // eslint-disable-next-line no-undef
    let idxValueU = BigInt(BigInt(buyOfferId + 1) * BigInt(2 ** 64)).toString()
    const messagesTable = await this._getTableRows({
      code: escrow,
      scope: escrow,
      table: 'pmessages',
      indexPosition: 2,
      keyType: 'i128',
      lowerBound: idxValue,
      upperBound: idxValueU
      // limit: 1
    })

    if (messagesTable.rows.length === 0) return 'No contact method'
    var messageRow = messagesTable.rows.filter(r => r.buy_offer_id === parseInt(buyOfferId))

    var messages
    if (arbiter) {
      messages = messagesTable.rows.filter(r => r.receiver === arbiter)
    } else {
      messages.push(messageRow[0])
    }

    let messagesList = []

    for (let message of messages) {
      console.log('MESSAGE TO DECRYPT', message)
      let plainMsg = await this.decryptMessage({
        message,
        recipientPrivateKey,
        arbiter
      })
      messagesList.push(plainMsg)
    }

    return messagesList.length > 1 ? messagesList : messagesList[0]
  }

  async decryptMessage ({
    message,
    recipientPrivateKey,
    arbiter
  }) {
    const rcptKey = PrivateKey.fromString(recipientPrivateKey).toElliptic()

    let ephemPublicKey = PublicKey.fromString(message.ephem_key)
    let ephemKey = ephemPublicKey.toElliptic()
    let iv = Buffer.from(message.iv, 'hex')
    let ciphertext = Buffer.from(message.message, 'hex')
    let mac = Buffer.from(message.mac, 'hex')

    let shared = Buffer.from(rcptKey.derive(ephemKey.getPublic()).toString('hex'), 'hex')
    let hash = shajs('sha512').update(shared).digest()

    let encryptionKey = hash.slice(0, 32)
    let macKey = hash.slice(32)

    let dataToMac = Buffer.concat(
      [
        Buffer.from(iv, 'hex'),
        Buffer.from(ephemPublicKey.key.data, 'hex'),
        Buffer.from(ciphertext, 'hex')
      ]
    )
    let realMac = crypto.createHmac('sha256', macKey).update(dataToMac).digest()

    if (!realMac.equals(mac)) {
      console.error('Bad MAC')
    } else {
      let cipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, iv)
      let firstChunk = cipher.update(ciphertext)
      let secondChunk = cipher.final()
      let plaintext = Buffer.concat([firstChunk, secondChunk])

      return arbiter ? { message: plaintext.toString(), sender: message.sender } : plaintext.toString()
    }
  }
}

export default EncryptionApi
