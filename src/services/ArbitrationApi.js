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

  getAssignetTicketByArbiter ({ arbiter }) {
    // eslint-disable-next-line no-undef
    const indexValue = (BigInt(eosjsAccountName.nameToUint64(arbiter)) * BigInt(2 ** 64)).toString()
    return this.fetchByIndex({
      scope: Contracts.CONTRACT_P2P,
      indexPosition: 4,
      keyType: 'i128',
      indexValue
    })
  }

  getAvailableTickets () {
    return this.fetchByIndex({
      scope: Contracts.CONTRACT_P2P,
      indexPosition: 1
    })
  }
}
export default ArbitrationApi
