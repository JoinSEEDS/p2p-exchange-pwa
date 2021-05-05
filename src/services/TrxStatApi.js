import BaseEosApi from './BaseEosApi'
import {
  Contracts
} from '~/const/Contracts'

class TrxStatApi extends BaseEosApi {
  constructor ({
    eosApi,
    notifier
  }) {
    super(
      eosApi,
      notifier,
      {
        contractAccount: Contracts.CONTRACT_SEEDS,
        table: 'trxstats',
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

  async getTrxStats ({ offset, limit }) {
    const trxStats = await this.fetch({
      scope: Contracts.CONTRACT_P2P,
      offset,
      limit
    })
    return trxStats
  }
}

export default TrxStatApi
