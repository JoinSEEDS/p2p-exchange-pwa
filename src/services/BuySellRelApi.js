import BaseEosApi from './BaseEosApi'
import {
  Contracts
} from '~/const/Contracts'

class BuySellRelApi extends BaseEosApi {
  constructor ({
    eosApi,
    notifier
  }) {
    super(
      eosApi,
      notifier,
      {
        contractAccount: Contracts.CONTRACT_SEEDS,
        table: 'buysellrel',
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

  async getBuySellRels ({ offset, limit }) {
    const buySellRels = await this.fetch({
      scope: Contracts.CONTRACT_P2P,
      offset,
      limit
    })
    return buySellRels
  }

  async getBuyOffersBySellOffer ({ offset, limit, sellOfferId }) {
    console.log('id in service', sellOfferId)
    const buySellRels = await this.fetch({
      scope: Contracts.CONTRACT_P2P,
      indexPosition: 3,
      keyType: 'i64',
      indexValue: sellOfferId,
      offset,
      limit
    })
    return buySellRels
  }
}

export default BuySellRelApi
