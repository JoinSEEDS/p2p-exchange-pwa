import Vue from 'vue'
import Vuex from 'vuex'

import accounts from './accounts'
import general from './general'
import balances from './balances'
import buyOffers from './buyOffers'
import buySellRels from './buySellRels'
import configs from './configs'
import sellOffers from './sellOffers'
import trxStats from './trxStats'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      accounts,
      general,
      balances,
      buyOffers,
      buySellRels,
      configs,
      sellOffers,
      trxStats
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
