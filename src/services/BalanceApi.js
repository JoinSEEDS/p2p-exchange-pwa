import BaseEosApi from './BaseEosApi'
import {
  Contracts
} from '~/const/Contracts'

class BalanceApi extends BaseEosApi {
  constructor ({
    eosApi,
    notifier
  }) {
    super(
      eosApi,
      notifier,
      {
        contractAccount: Contracts.CONTRACT_SEEDS,
        table: 'balances',
        tableId: 'id',
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

  async getBalances ({ offset, limit }) {
    const balances = await this.fetch({
      scope: Contracts.CONTRACT_P2P,
      offset,
      limit
    })
    return balances
  }

  async getBalanceByAccount ({ accountName }) {
    return this.fetchByIndex({
      scope: Contracts.CONTRACT_P2P,
      indexPosition: 1,
      indexValue: accountName
    })
  }
}

export default BalanceApi
