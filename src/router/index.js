import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import Croppa from 'vue-croppa'

Vue.use(Croppa)
Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function ({ store }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach(async (to, from, next) => {
    // Verify the screens is for users guest
    if (to.matched.some(record => !record.meta.guest)) {
      // Verify if the user is authenticated
      if (store.getters['accounts/isAuthenticated']) {
        // Verify if the user has profile completed
        // let payp = await store.dispatch('profiles/getPaypal')
        // let hasPaypal = (!!payp && payp.length > 0)
        // if (hasPaypal && (store.getters['accounts/isP2PProfileCompleted'] || to.matched.some(record => record.meta.notProfile))) {
        if (store.getters['accounts/isP2PProfileCompleted'] || to.matched.some(record => record.meta.notProfile)) {
          if (to.matched.some(record => !record.meta.visitorScreen) && !store.getters['accounts/userCanSell']) {
            return next({ path: '/dashboard' })
          } else {
            return next()
          }
        } else {
          return next({ name: 'account' })
        }
        // return next()
      } else if (to.path === '/login') {

      } else {
        return next({ path: `/?returnUrl=${to.path}` })
      }
    } else {
      return next()
    }
  })

  return Router
}
