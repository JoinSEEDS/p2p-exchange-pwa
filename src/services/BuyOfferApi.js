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

  async acceptBuyOffer ({ buyOfferId, messageData }) {
    console.log('message data service', messageData)
    const actions = [
      {
        account: Contracts.CONTRACT_P2P,
        name: 'accptbuyoffr',
        data: {
          buy_offer_id: buyOfferId
        }
      },
      {
        account: Contracts.CONTRACT_P2P,
        name: 'addoffermsg',
        data: {
          ...messageData
        }
      }
    ]
    console.log('actions', actions)
    // const actions = [{
    //   account: Contracts.CONTRACT_P2P,
    //   name: 'addoffermsg',
    //   data: {
    //     buy_offer_id: buyOfferId,
    //     iv: iv.toString('hex'),
    //     ephem_key: ephemPublicKey.toString(),
    //     message: ciphertext.toString('hex'),
    //     mac: mac.toString('hex')
    //   }
    // }]

    return this.eosApi.signTransaction(actions)
  }

  async cancelBuyOffer ({ buyOfferId }) {
    const actions = [{
      account: Contracts.CONTRACT_P2P,
      name: 'delbuyoffer',
      data: {
        buy_offer_id: buyOfferId
      }
    }]

    return this.eosApi.signTransaction(actions)
  }

  async rejectBuyOffer ({ buyOfferId }) {
    const actions = [{
      account: Contracts.CONTRACT_P2P,
      name: 'rejctbuyoffr',
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
