// const { Api, Serialize } = require('eosjs')
import { Api, Serialize, JsonRpc } from 'eosjs'
// const fetch = require('node-fetch')
// const util = require('util')
// import util from 'util'
// const zlib = require('zlib')
import zlib from 'zlib'
// const { SigningRequest } = require('eosio-signing-request')
import * as ESR from 'eosio-signing-request'
// import { SigningRequest, CallbackPayload } from 'eosio-signing-request'

import QRCode from 'qrcode'
// import md5 from 'md5'
// const QRCode = require('qrcode')
// const md5 = require('md5')
import HyperionSocketClient from '@eosrio/hyperion-stream-client'

import AnchorLink from 'anchor-link'
// import { Link } from '~/lib/anchor-link/src/link.ts'
import AnchorLinkBrowserTransport from 'anchor-link-browser-transport'
// import { v4 as uuid } from 'uuid'
// import AnchorLinkConsoleTransport from 'anchor-link-console-transport'
const {
  HYPERION_TIME_OUT,
  HYPERION_ENDPOINT
} = process.env

class EsrApi {
  constructor ({ api, rpc }) {
    this.rpc = rpc
    this.api = api
  }

  async buildTransactionLink (actions) {
    const info = await this.rpc.get_info()
    console.log('info', info)
    const chainId = info.chain_id
    // console.log('transport', AnchorLinkConsoleTransport())

    console.log('Anchor Link generated', this.link)
    this.link = new AnchorLink({
      chains: [{
        // chainId: '1eaa0824707c8c16bd25145493bf062aecddfeb56c736f6ba6397f3195f33c9f',
        chainId,
        nodeUrl: 'https://test.telos.kitchen'
      }],
      // service: this.service,
      // transport: LinkTransport
      transport: new AnchorLinkBrowserTransport()
      // verifyProofs: this.verifyProofs,
    })
    // const identity = await this.link.login('test')
    // const identity = await this.link.transact({ actions })
    const headBlock = await this.rpc.get_block(info.last_irreversible_block_num)
    // const chainId = info.chain_id
    // ref_block_num: headBlock.block_num & 0xffff, //
    // ref_block_prefix: headBlock.ref_block_prefix,

    const args = {
      transaction: {
        expiration: new Date().getTime() + (1000 * 60 * 60),
        ref_block_num: headBlock.block_num & 0xffff, //
        ref_block_prefix: headBlock.ref_block_prefix,
        max_net_usage_words: 0,
        max_cpu_usage_ms: 0,
        delay_sec: 0,
        actions
      }
    }
    let c, t
    const { request } = await this.link.createRequest(args, c, t)
    const esr = request.encode(true, false)
    console.log('request ESR', esr)
    const qrPath = await this.buildQrCode(esr)
    // const qr = 'https://' + window.hostname + '/' + qrPath

    return {
      esr,
      qr: qrPath
    }
    // return esr
  }

  async buildTransaction (_actions) {
    const actions = _actions.map(action => {
      action.authorization = [
        {
          // actor: 'jmgayosso155',
          actor: localStorage.getItem('account'),
          permission: 'active'
          // actor: '............1',
          // permission: '............2'
        }
      ]

      // action.data.memo = (action.data.memo) ? `${action.data.memo}-${uuid()}` : `${action.name}-${uuid()}`
      return action
    })

    const chainEndpoint = `${process.env.NETWORK_PROTOCOL}://${process.env.NETWORK_HOST}`
    // console.log('chainEndpoint', chainEndpoint, actions)
    const rpc = new JsonRpc(chainEndpoint)
    // const rpc = new JsonRpc(chainEndpoint)
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

    const transaction = {
      expiration,
      ref_block_num: headBlock.block_num & 0xffff, //
      ref_block_prefix: headBlock.ref_block_prefix,
      max_net_usage_words: 0,
      delay_sec: 0,
      context_free_actions: [],
      actions: actions,
      transaction_extensions: []
    }
    const request = await ESR.SigningRequest.create({ transaction, chainId }, opts)
    request.setInfoKey('same_device', true)
    // request.setInfoKey('return_path', 'googlechrome://')
    // request.setBroadcast(true)
    // console.log('creating callback', ESR)
    // const callback = `https://cb.anchor.link/${uuid()}`
    // console.log('callback', callback)
    // request.setCallback(callback)
    const uri = request.encode(true, false)
    return uri
  }

  async buildQrCode (esr) {
    // const filename = md5(esr)
    // const filepath = `images/${filename}.png`
    // console.log('buildQrCode', filename, QRCode)
    try {
      const qr = await QRCode.toDataURL(esr)
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

  async signEsrTransaction ({ esr, contractName, actionName, data }) {
    try {
      window.open(esr, '_blank')
      return this.listenTransaction({ contractName, actionName, data })
    } catch (e) {
      console.error('error using ESR', e)
    } finally {
    }
  }

  async listenCallbackFromLW ({ store }) {
    try {
      return new Promise((resolve, reject) => {
        window.setResponseCallbackLW = ({ status, message }) => {
          console.log('SetResponseCallbackLW', status, message)
          if (status === 'success') {
            resolve()
            store.commit('general/setESRRequest', null, { root: true })
          } else {
            reject(message)
          }
        }
      })
    } catch (e) {
      console.error('Error listenign transaction: ', e)
    }
  }

  async listenTransaction ({ contractName, actionName, data, store }) {
    try {
      // const ENDPOINT = 'https://testnet.telos.caleos.io/'
      // const ENDPOINT = 'https://telos.caleos.io/'
      console.log('listenTransaction', HYPERION_ENDPOINT)
      const client = new HyperionSocketClient(HYPERION_ENDPOINT, { async: true })

      return new Promise((resolve, reject) => {
        const current = new Date().toISOString()
        // const current = '2021-09-30T00:00:00.000Z'
        // const filters = []
        const _dataArray = Object.entries(data)
        let _filters
        const haveMemo = _dataArray.find(v => v[0] === 'memo')
        console.log('_dataArray', haveMemo, _dataArray)

        if (haveMemo) {
          _filters = [
            {
              field: `act.data.memo`,
              value: haveMemo[1]
            }
          ]
        } else {
          _filters = _dataArray.map(prop => {
            return {
              field: `act.data.${prop[0]}`,
              value: prop[1].toString()
            }
          })
        }
        const filters = _filters.filter(v => v.value !== '............1')
        console.log('filters', filters)

        const configs = {
          contract: contractName,
          action: actionName,
          account: '',
          start_from: current,
          read_until: 0,
          filters
          // filters: [
          //   {
          //     field: 'act.data.memo',
          //     value: memo
          //   }
          // ]
        }
        client.onConnect = () => {
          client.streamActions(configs)
          console.log('onConnect', configs)
        }

        // see 3 for handling data
        client.onData = async (data, ack) => {
          ack() // ACK when done
          console.log('On Data Listened', data) // process incoming data, replace with your code
          resolve(data)
          store.commit('general/setESRRequest', null, { root: true })
        }

        client.connect(() => {
          console.log('connected!', current)
          store.commit('general/setIsLoading', false, { root: false })
        })

        setTimeout(() => {
          reject('TimeOut')
        }, HYPERION_TIME_OUT * 1000)
      })
    } catch (e) {
      console.error('Error listenign transaction', e)
    }
  }
}

export default EsrApi
