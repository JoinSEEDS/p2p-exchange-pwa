import BaseEosApi from './BaseEosApi'
import {
  Contracts
} from '~/const/Contracts'

class SeedsValueApi extends BaseEosApi {
  constructor ({
    eosApi,
    notifier
  }) {
    super(
      eosApi,
      notifier,
      {
        contractAccount: Contracts.CONTRACT_SEEDS_VALUES,
        table: 'price',
        tableId: 'id'
      }
    )
  }

  /** *
  * Parse transfers base
  */
  async _parseRows (rows, modifierProps) {
    return rows
  }

  async getCurrentPricePerUSD () {
    const row = await this.fetchByIndex({
      scope: Contracts.CONTRACT_SEEDS_VALUES
    })
    return row.rows[0].current_seeds_per_usd
  }
}

export default SeedsValueApi
