// const { Api, Serialize } = require('eosjs')
import { Api, Serialize, JsonRpc } from 'eosjs'
// const fetch = require('node-fetch')
// const util = require('util')
import util from 'util'
// const zlib = require('zlib')
import zlib from 'zlib'
// const { SigningRequest } = require('eosio-signing-request')
import { SigningRequest } from 'eosio-signing-request'

import QRCode from 'qrcode'
import md5 from 'md5'
// const QRCode = require('qrcode')
// const md5 = require('md5')

class EsrApi {
  constructor ({ api, rpc }) {
    this.rpc = rpc
    this.api = api
  }

  // async buildTransaction (actions, endpoint = 'https://node.hypha.earth') {
  async buildTransaction (actions) {
    console.log('util', util)
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
    const expiration = Serialize.timePointSecToDate(Serialize.dateToTimePointSec(headBlock.timestamp) + 3600)

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
    console.log('signing', SigningRequest)
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

  async signTransaction (actions) {
    const esr = await this.buildTransaction(actions)
    // const qrPath = await this.buildQrCode(esr)
    // const qr = 'https://' + window.hostname + '/' + qrPath

    return {
      esr
      // qr: qrPath
    }
  }
}

export default EsrApi
