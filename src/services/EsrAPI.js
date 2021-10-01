// const { Api, Serialize } = require('eosjs')
import { Api, Serialize, JsonRpc } from 'eosjs'
// const fetch = require('node-fetch')
// const util = require('util')
// import util from 'util'
// const zlib = require('zlib')
import zlib from 'zlib'
// const { SigningRequest } = require('eosio-signing-request')
import { SigningRequest } from 'eosio-signing-request'

import QRCode from 'qrcode'
import md5 from 'md5'
// const QRCode = require('qrcode')
// const md5 = require('md5')
import HyperionSocketClient from '@eosrio/hyperion-stream-client'

class EsrApi {
  constructor ({ api, rpc }) {
    this.rpc = rpc
    this.api = api
  }

  // async buildTransaction (actions, endpoint = 'https://node.hypha.earth') {
  async buildTransaction (actions) {
    // console.log('util', util)
    // const textEncoder = new util.TextEncoder()
    // const textDecoder = new util.TextDecoder()
    const rpc = new JsonRpc('https://test.telos.kitchen', {
      fetch
    })
    const textDecoder = new TextDecoder()
    const textEncoder = new TextEncoder()

    // const rpc = this.rpc

    const eos = new Api({
      rpc,
      textDecoder,
      textEncoder
    })

    const opts = {
      textEncoder,
      textDecoder,
      zlib: {
        deflateRaw: (data) => new Uint8Array(zlib.deflateRawSync(Buffer.from(data))),
        inflateRaw: (data) => new Uint8Array(zlib.inflateRawSync(Buffer.from(data)))
      },
      abiProvider: {
        // eslint-disable-next-line no-return-await
        getAbi: async (account) => await eos.getAbi(account)
      }
    }

    const info = await rpc.get_info()
    const headBlock = await rpc.get_block(info.last_irreversible_block_num)
    const chainId = info.chain_id
    // set expiration to 7 days from now.
    const expiration = Serialize.timePointSecToDate(Serialize.dateToTimePointSec(headBlock.timestamp) + 250)

    // const identity = {
    //   account: '',
    //   name: 'identity',
    //   data: {
    //     scope: 'PTM'
    //   }
    // }

    const transaction = {
      expiration,
      ref_block_num: headBlock.block_num & 0xffff, //
      ref_block_prefix: headBlock.ref_block_prefix,
      max_net_usage_words: 0,
      delay_sec: 0,
      context_free_actions: [],
      // callback: 'https://ptm-dev.hypha.earth/',
      actions: actions,
      // identity,
      transaction_extensions: [],
      signatures: [],
      context_free_data: []
    }
    // console.log('signing', SigningRequest)
    // const uri = await SigningRequest.signingDigest(chainId)
    const request = await SigningRequest.create({ transaction, chainId }, opts)
    const uri = request.encode()
    // console.log('encode success', uri, transaction, opts)
    return uri
  }

  async buildQrCode (esr) {
    const filename = md5(esr)
    // const filepath = `images/${filename}.png`
    // console.log('buildQrCode', filename, QRCode)
    try {
      const qr = await QRCode.toDataURL(filename)
      return qr
    } catch (err) {
      console.error(err)
      return null
    }
  }

  async generateESR (actions) {
    const esr = await this.buildTransaction(actions)
    const qrPath = await this.buildQrCode(esr)
    // const qr = 'https://' + window.hostname + '/' + qrPath

    return {
      esr,
      qr: qrPath
    }
  }

  async signEsrTransaction ({ actions }) {
    try {
      // const data = {
      //   from: 'jmgayosso155',
      //   to: 'm1escrowp2px',
      //   quantity: '0.1000 SEEDS',
      //   memo: 'test esr deposit 15'
      // }
      // const actions = [{
      //   account: 'token.seeds',
      //   name: 'transfer',
      //   data,
      //   authorization: [
      //     {
      //       actor: 'jmgayosso155',
      //       permission: 'active'
      //       // actor: '............1',
      //       // permission: '............2'
      //     }
      //   ]
      // }]
      // const _actions = {
      //   ...actions,
      //   authorization: [
      //     {
      //       actor: 'jmgayosso155',
      //       permission: 'active'
      //     }
      //   ]
      // }
      const { esr } = await this.generateESR(actions)
      // const r = await window.open(esr.replace('esr://', 'https://eosio.to/'))
      const r = await window.open(esr, '_blank')
      console.log('store', esr, r)
      const ENDPOINT = 'https://testnet.telos.caleos.io/'
      const client = new HyperionSocketClient(ENDPOINT, { async: false })

      return new Promise((resolve, reject) => {
        const current = new Date().toISOString()
        // const current = '2021-09-30T00:00:00.000Z'
        client.onConnect = () => {
          client.streamActions({
            contract: 'token.seeds',
            action: 'transfer',
            account: '',
            start_from: current,
            read_until: 0,
            // filters: []
            filters: [
              {
                field: 'act.data.memo',
                value: actions[0].data.memo
              }
            ]
          })
        }

        // see 3 for handling data
        client.onData = async (data, ack) => {
          console.log('On Data Listened', data) // process incoming data, replace with your code
          resolve(data)
          // ack() // ACK when done
        }

        client.connect(() => {
          console.log('connected!', current)
        })

        setTimeout(() => {
          reject('TimeOut')
        }, 30 * 1000)
      })
    } catch (e) {
      console.error('error using ESR', e)
    } finally {
    }
  }
}

export default EsrApi
