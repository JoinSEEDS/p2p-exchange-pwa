import BaseEosApi from './BaseEosApi'
import {
  Contracts
} from '~/const/Contracts'

class BuyOfferApi extends BaseEosApi {
  constructor ({
    eosApi,
    notifier
  }) {
    super(
      eosApi,
      notifier,
      {
        contractAccount: Contracts.CONTRACT_SEEDS,
        table: 'buyoffers',
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

  async getBuyOffers ({ offset, limit }) {
    const buyOffers = await this.fetch({
      scope: Contracts.CONTRACT_P2P,
      offset,
      limit
    })
    return buyOffers
  }
}

export default BuyOfferApi
