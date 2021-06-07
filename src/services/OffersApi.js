/* eslint-disable no-undef */
import BaseEosApi from './BaseEosApi'
import {
  Contracts
} from '~/const/Contracts'
import eosjsAccountName from 'eosjs-account-name'

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
        start = nextKey || BigInt(parseInt(eosjsAccountName.nameToUint64('s.active')) * (2 ** 64)).toString()
        console.log('index 11 ', filterValue, nextKey, start)
        break
      case 12:
        // eslint-disable-next-line no-undef
        start = nextKey || (BigInt(eosjsAccountName.nameToUint64('s.active')) * BigInt(2 ** 64) + BigInt(eosjsAccountName.nameToUint64(filterValue))).toString()
        break
      case 13:
        // eslint-disable-next-line no-undef
        start = nextKey || (BigInt(eosjsAccountName.nameToUint64('s.active')) * BigInt(2 ** 64) + BigInt(eosjsAccountName.nameToUint64(filterValue))).toString()

        console.log('index 13 ', filterValue, nextKey, start)
        break
      default:
        // eslint-disable-next-line no-undef
        start = nextKey || BigInt(parseInt(eosjsAccountName.nameToUint64('s.active')) * (2 ** 64)).toString()
        break
    }
    // let start = nextKey || BigInt(parseInt(eosjsAccountName.nameToUint64('s.active')) * (2 ** 64)).toString()

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

  async getBuyOfferByUser ({ accountName, limit, nextKey }) {
    let start = nextKey || (BigInt(eosjsAccountName.nameToUint64(accountName)) * BigInt(2 ** 64)).toString()
    const sellOffer = await this._getTableRows({
      indexPosition: 6,
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
