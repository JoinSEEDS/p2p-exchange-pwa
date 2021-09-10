import BaseEosApi from './BaseEosApi'
import {
  Contracts
} from '~/const/Contracts'
import eosjsAccountName from 'eosjs-account-name'

class ArbitrationApi extends BaseEosApi {
  constructor ({
    eosApi,
    notifier
  }) {
    super(
      eosApi,
      notifier,
      {
        contractAccount: Contracts.CONTRACT_P2P,
        table: 'arbitoffs',
        tableId: 'offer_id',
        defaultSortField: 'offer_id'
      }
    )
  }

  /** *
  * Parse transfers base
  */
  async _parseRows (rows) {
    return rows
  }

  setArbiterToOffer ({ arbiter, offerId }) {
    const actions = [{
      account: Contracts.CONTRACT_P2P,
      name: 'arbtrgeoffer',
      data: {
        arbiter,
        offer_id: offerId
      }
    }]

    return this.eosApi.signTransaction(actions)
  }

  initArbiter ({ offerId }) {
    const actions = [{
      account: Contracts.CONTRACT_P2P,
      name: 'initarbitrage',
      data: {
        buy_offer_id: offerId
      }
    }]

    return this.eosApi.signTransaction(actions)
  }

  resolveToBuyer ({ offerId, notes }) {
    const actions = [{
      account: Contracts.CONTRACT_P2P,
      name: 'resolvebuyer',
      data: {
        offer_id: offerId,
        notes: notes
      }
    }]

    return this.eosApi.signTransaction(actions)
  }

  resolveToSeller ({ offerId, notes }) {
    const actions = [{
      account: Contracts.CONTRACT_P2P,
      name: 'resolvesellr',
      data: {
        offer_id: offerId,
        notes: notes
      }
    }]

    return this.eosApi.signTransaction(actions)
  }

  getAssignetTicketByArbiter ({ arbiter, nextKey, limit }) {
    // eslint-disable-next-line no-undef
    const key = nextKey || (BigInt(eosjsAccountName.nameToUint64(arbiter)) * BigInt(2 ** 64)).toString()
    // eslint-disable-next-line no-undef
    const upperBound = nextKey || (BigInt(eosjsAccountName.nameToUint64(arbiter)) * BigInt(2 ** 64) + BigInt(18446744073709551615)).toString()
    return this._getTableRows({
      indexPosition: 4,
      lowerBound: key,
      upperBound,
      keyType: 'i128',
      limit
    })
  }

  getAvailableTickets ({ nextKey, limit }) {
    return this._getTableRows({
      lowerBound: nextKey,
      limit,
      indexPosition: 1
    })
    /* return this.fetchByIndex({
      scope: Contracts.CONTRACT_P2P,
      indexPosition: 1
    }) */
  }

  getTicket ({ id }) {
    return this.fetchById({
      idValue: id
    })
  }

  sendContactMethods ({ messageData }) {
    const actions = [
      {
        account: Contracts.CONTRACT_P2P,
        name: 'sendconmethd',
        data: {
          ...messageData
        }
      }
    ]
    return this.eosApi.signTransaction(actions)
  }
}
export default ArbitrationApi
