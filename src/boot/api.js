import { Api, JsonRpc } from 'eosjs'
import {
  UserApi,
  AccountApi,
  BalanceApi,
  BuyOfferApi,
  BuySellRelApi,
  ConfigApi,
  SellOfferApi,
  TrxStatApi,
  SeedsValueApi,
  OffersApi,
  SettingsApi,
  EncryptionApi,
  ArbitrationApi,
  EsrApi
} from '~/services'

const signTransaction = async function (actions) {
  actions.forEach(action => {
    if (!action.authorization || !action.authorization.length) {
      action.authorization = [{
        actor: this.state.accounts.account,
        permission: 'active'
      }]
    }
  })
  let transaction = null
  try {
    if (this.$type === 'ual') {
      transaction = await this.$ualUser.signTransaction({
        actions
      }, {
        blocksBehind: 3,
        expireSeconds: 30
      })
    }
  } catch (e) {
    throw new Error(e.cause.message)
  }
  return transaction
}

const getTableRows = async function (options) {
  if (this.$type === 'ual') {
    return this.$ualUser.rpc.get_table_rows({
      json: true,
      ...options
    })
  } else {
    return this.$defaultApi.rpc.get_table_rows({
      json: true,
      ...options
    })
  }
}

export default ({ store }) => {
  const rpc = new JsonRpc(`${process.env.NETWORK_PROTOCOL}://${process.env.NETWORK_HOST}:${process.env.NETWORK_PORT}`)
  const _api = new Api({ rpc, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() })
  store['$defaultApi'] = _api
  const api = {
    signTransaction: signTransaction.bind(store),
    getTableRows: getTableRows.bind(store)
  }

  const esrApi = new EsrApi({
    api: _api,
    rpc
  })

  const userApi = new UserApi({
    eosApi: api
  })

  const accountApi = new AccountApi({
    eosApi: api,
    esrApi
  })

  const balanceApi = new BalanceApi({
    eosApi: api,
    axios: store.$axios
  })

  const buyOfferApi = new BuyOfferApi({
    eosApi: api
  })

  const buySellRelApi = new BuySellRelApi({
    eosApi: api
  })

  const configApi = new ConfigApi({
    eosApi: api
  })

  const settingsApi = new SettingsApi({
    eosApi: api
  })

  const sellOfferApi = new SellOfferApi({
    eosApi: api
  })

  const trxStatApi = new TrxStatApi({
    eosApi: api
  })

  const seedsValueApi = new SeedsValueApi({
    eosApi: api
  })

  const offersApi = new OffersApi({
    eosApi: api
  })

  const encrypionApi = new EncryptionApi({
    eosApi: api
  })

  const arbitrationApi = new ArbitrationApi({
    eosApi: api
  })

  store['$api'] = api
  store['$userApi'] = userApi
  store['$accountApi'] = accountApi
  store['$balanceApi'] = balanceApi
  store['$buyOfferApi'] = buyOfferApi
  store['$buySellRelApi'] = buySellRelApi
  store['$configApi'] = configApi
  store['$settingsApi'] = settingsApi
  store['$sellOfferApi'] = sellOfferApi
  store['$trxStatApi'] = trxStatApi
  store['$seedsValueApi'] = seedsValueApi
  store['$offersApi'] = offersApi
  store['$encrypionApi'] = encrypionApi
  store['$arbitrationApi'] = arbitrationApi
  store['$esrApi'] = esrApi
}
