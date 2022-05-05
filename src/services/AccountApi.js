import BaseEosApi from './BaseEosApi'
import {
  Contracts
} from '~/const/Contracts'
import { v4 as uuid } from 'uuid'
// import User from '../domain/User'

class AccountApi extends BaseEosApi {
  constructor ({
    eosApi,
    esrApi,
    // accountName,
    notifier
  }) {
    super(
      eosApi,
      notifier,
      {
        contractAccount: Contracts.CONTRACT_P2P,
        table: 'users',
        tableId: 'account',
        defaultSortField: 'account'
      }
    )
    this.esrApi = esrApi
  }

  /** *
  * Parse transfers base
  */
  async _parseRows (rows, modifierProps) {
    return rows
  }

  async getAccountInfo ({ accountName }) {
    return this.fetchByIndex({
      scope: Contracts.CONTRACT_P2P,
      indexPosition: 1,
      indexValue: accountName
    })
    // return accountInfo
  }

  async saveAccountData ({ accountName, contactMethods, paymentMethods, timeZone, fiatCurrency, publicKey }) {
    const upsert = {
      account: Contracts.CONTRACT_P2P,
      name: 'upsertuser',
      data: {
        account: accountName,
        contact_methods: contactMethods,
        payment_methods: paymentMethods,
        time_zone: timeZone,
        fiat_currency: fiatCurrency,
        memo: `upsertuser - ${uuid()}`
      }
    }

    const addPublicKey = {
      account: Contracts.CONTRACT_P2P,
      name: 'addpublickey',
      data: {
        account: accountName,
        public_key: publicKey,
        memo: `addpublickey - ${uuid()}`
      }
    }

    const actions = [ upsert ]
    if (publicKey) {
      actions.push(addPublicKey)
    }

    // const actions = [{
    //   account: Contracts.CONTRACT_P2P,
    //   name: 'addpublickey',
    //   data: {
    //     account: account,
    //     public_key: publicKey
    //   }
    // }]

    return this.eosApi.signTransaction(actions)
  }

  async withdraw ({ accountName, quantity, memo }) {
    const actions = [{
      account: Contracts.CONTRACT_P2P,
      name: 'withdraw',
      data: {
        // to: 'token.seeds',
        account: accountName,
        quantity,
        memo
      }
    }]

    return this.eosApi.signTransaction(actions)
  }

  async deposit ({ accountName, quantity, memo }) {
    const actions = [{
      account: Contracts.CONTRACT_SEEDS_WALLET,
      name: 'transfer',
      data: {
        from: accountName,
        to: Contracts.CONTRACT_P2P,
        quantity,
        memo
      }
      // authorization: [
      //   {
      //     actor: 'jmgayosso155',
      //     permission: 'active'
      //     // actor: '............1',
      //     // permission: '............2'
      //   }
      // ]
    }]

    // const { esr } = await this.esrApi.generateESR(actions)
    // return this.esrApi.signEsrTransaction({
    //   esr,
    //   contractName: actions[0].account,
    //   actionName: actions[0].name,
    //   memo: actions[0].data.memo
    // })
    return this.eosApi.signTransaction(actions)
  }
}

export default AccountApi
