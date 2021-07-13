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

  async addBuyOffer ({ accountName, sellOfferId, quantity, paymentMethod }) {
    const actions = [{
      account: Contracts.CONTRACT_P2P,
      name: 'addbuyoffer',
      data: {
        buyer: accountName,
        sell_offer_id: sellOfferId,
        quantity,
        payment_method: paymentMethod
      }
    }]

    return this.eosApi.signTransaction(actions)
  }

  async acceptBuyOffer ({ buyOfferId }) {
    const actions = [{
      account: Contracts.CONTRACT_P2P,
      name: 'accptbuyoffr',
      data: {
        buy_offer_id: buyOfferId
      }
    }]

    return this.eosApi.signTransaction(actions)
  }

  async confirmPayment ({ buyOfferId }) {
    const actions = [{
      account: Contracts.CONTRACT_P2P,
      name: 'confrmpaymnt',
      data: {
        buy_offer_id: buyOfferId
      }
    }]

    return this.eosApi.signTransaction(actions)
  }

  async payOffer ({ buyOfferId }) {
    const actions = [{
      account: Contracts.CONTRACT_P2P,
      name: 'payoffer',
      data: {
        buy_offer_id: buyOfferId
      }
    }]

    return this.eosApi.signTransaction(actions)
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
