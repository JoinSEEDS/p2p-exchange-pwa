import BaseEosApi from './BaseEosApi'
import {
  Contracts
} from '~/const/Contracts'
// import User from '../domain/User'

class AccountApi extends BaseEosApi {
  constructor ({
    eosApi,
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
  }

  /** *
  * Parse transfers base
  */
  async _parseRows (rows, modifierProps) {
    return rows
  }

  async getAccountInfo ({ accountName }) {
    const accountInfo = await this.fetchByIndex({
      scope: Contracts.CONTRACT_P2P,
      indexPosition: 1,
      indexValue: accountName
    })

    return accountInfo
  }

  async saveAccountData ({ accountName, contactMethods, paymentMethods, timeZone, fiatCurrency }) {
    const actions = [{
      account: Contracts.CONTRACT_P2P,
      name: 'enterround',
      data: {
        account: accountName,
        contact_methods: contactMethods,
        payment_methods: paymentMethods,
        time_zone: timeZone,
        fiat_zone: fiatCurrency
      }
    }]

    return this.eosApi.signTransaction(actions)
  }
}

export default AccountApi
