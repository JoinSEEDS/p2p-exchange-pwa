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

  async getSellOffers ({ nextKey, limit, indexPosition, filterValue }) {
    // eslint-disable-next-line no-undef
    // debugger
    let start
    switch (indexPosition) {
      case 11:
        // eslint-disable-next-line no-undef
        start = nextKey || BigInt(parseInt(eosjsAccontName.nameToUint64('s.active')) * (2 ** 64)).toString()
        console.log('index 11 ', filterValue, nextKey, start)
        break
      case 12:
        // eslint-disable-next-line no-undef
        start = nextKey || BigInt(parseInt(eosjsAccontName.nameToUint64(filterValue)) * (2 ** 64)).toString()
        break
      case 13:
        // eslint-disable-next-line no-undef
        start = nextKey || BigInt(parseInt(eosjsAccontName.nameToUint64('s.active')) * (2 ** 64) + parseInt(eosjsAccontName.nameToUint64(filterValue))).toString()
        console.log('index 13 ', filterValue, nextKey, start)
        break
      default:
        // eslint-disable-next-line no-undef
        start = nextKey || BigInt(parseInt(eosjsAccontName.nameToUint64('s.active')) * (2 ** 64)).toString()
        break
    }
    // let start = nextKey || BigInt(parseInt(eosjsAccontName.nameToUint64('s.active')) * (2 ** 64)).toString()

    const sellOffer = await this._getTableRows({
      indexPosition,
      lowerBound: start,
      // upperBound: 'offer.sell',
      keyType: 'i128',
      // offset,
      limit,
      // reverse: false,
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
