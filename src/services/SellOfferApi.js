import BaseEosApi from './BaseEosApi'
import {
  Contracts
} from '~/const/Contracts'
import { v4 as uuid } from 'uuid'

class SellOfferApi extends BaseEosApi {
  constructor ({
    eosApi,
    notifier
  }) {
    super(
      eosApi,
      notifier,
      {
        contractAccount: Contracts.CONTRACT_SEEDS,
        table: 'selloffers',
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

  async getSellOffers ({ offset, limit }) {
    const sellOffers = await this.fetch({
      scope: Contracts.CONTRACT_P2P,
      offset,
      limit
    })
    return sellOffers
  }

  async addSellOffer ({ accountName, totalOffered, pricePercentage }) {
    const actions = [{
      account: Contracts.CONTRACT_P2P,
      name: 'addselloffer',
      data: {
        seller: accountName,
        total_offered: totalOffered,
        price_percentage: pricePercentage,
        memo: `addselloffer - ${uuid()}`
      }
    }]

    return this.eosApi.signTransaction(actions)
  }

  async delSellOffer ({ sellOfferId }) {
    const actions = [{
      account: Contracts.CONTRACT_P2P,
      name: 'delselloffer',
      data: {
        sell_offer_id: sellOfferId,
        memo: `delselloffer - ${uuid()}`
      }
    }]

    return this.eosApi.signTransaction(actions)
  }
}

export default SellOfferApi
