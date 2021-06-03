import BaseEosApi from './BaseEosApi'
import {
  Contracts
} from '~/const/Contracts'
import eosjsAccontName from 'eosjs-account-name'

class OffersApi extends BaseEosApi {
  constructor ({
    eosApi,
    notifier
  }) {
    super(
      eosApi,
      notifier,
      {
        contractAccount: Contracts.CONTRACT_P2P,
        table: 'offers',
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

  async getSellOffers ({ nextKey, limit, indexPosition }) {
    // const index = 5
    // const buyOffers = await this.fetchByIndex({
    //   scope: Contracts.CONTRACT_P2P,
    //   offset,
    //   limit
    // })
    // let start = BigInt(cycle[0].cycle_id * (2 ** 64)).toString()
    // eslint-disable-next-line no-undef
    let start = nextKey || BigInt(parseInt(eosjsAccontName.nameToUint64('s.active')) * (2 ** 64)).toString()
    // debugger

    const sellOffer = await this._getTableRows({
      indexPosition,
      lowerBound: start,
      // upperBound: 'offer.sell',
      keyType: 'i128',
      // offset,
      limit,
      reverse: false,
      table: 'offers'
    })

    return sellOffer
  }

  async getOffer (offerId) {
    const sellOffer = await this.fetchById({
      // scope,
      idValue: offerId
      // indexValue,
    })

    return sellOffer
  }
}

export default OffersApi
