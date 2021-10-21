import BaseEosApi from './BaseEosApi'
import {
  Contracts
} from '~/const/Contracts'
import { v4 as uuid } from 'uuid'

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
        payment_method: paymentMethod,
        memo: `addbuyoffer - ${uuid()}`
      }
    }]

    return this.eosApi.signTransaction(actions)
  }

  async acceptBuyOffer ({ buyOfferId, messageData }) {
    const actions = [
      {
        account: Contracts.CONTRACT_P2P,
        name: 'accptbuyoffr',
        data: {
          buy_offer_id: buyOfferId,
          memo: `accptbuyoffr - ${uuid()}`
        }
      },
      {
        account: Contracts.CONTRACT_P2P,
        name: 'addoffermsg',
        data: {
          ...messageData,
          memo: `addoffermsg - ${uuid()}`
        }
      }
    ]
    return this.eosApi.signTransaction(actions)
  }

  async cancelBuyOffer ({ buyOfferId }) {
    const actions = [{
      account: Contracts.CONTRACT_P2P,
      name: 'delbuyoffer',
      data: {
        buy_offer_id: buyOfferId,
        memo: `delbuyoffer - ${uuid()}`
      }
    }]

    return this.eosApi.signTransaction(actions)
  }

  async rejectBuyOffer ({ buyOfferId }) {
    const actions = [{
      account: Contracts.CONTRACT_P2P,
      name: 'rejctbuyoffr',
      data: {
        buy_offer_id: buyOfferId,
        memo: `rejctbuyoffr - ${uuid()}`
      }
    }]

    return this.eosApi.signTransaction(actions)
  }

  async confirmPayment ({ buyOfferId }) {
    const actions = [{
      account: Contracts.CONTRACT_P2P,
      name: 'confrmpaymnt',
      data: {
        buy_offer_id: buyOfferId,
        memo: `confrmpaymnt - ${uuid()}`
      }
    }]

    return this.eosApi.signTransaction(actions)
  }

  async payOffer ({ buyOfferId }) {
    const actions = [{
      account: Contracts.CONTRACT_P2P,
      name: 'payoffer',
      data: {
        buy_offer_id: buyOfferId,
        memo: `payoffer - ${uuid()}`
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
