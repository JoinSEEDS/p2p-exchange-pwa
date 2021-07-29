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
        // console.log('Is authenticated', store.getters['accounts/isP2PProfileCompleted'], to.matched.some(record => record.meta.notProfile))
        // Verify if the user has profile completed
        if (store.getters['accounts/isP2PProfileCompleted'] || to.matched.some(record => record.meta.notProfile)) {
        // if (store.getters['profilesppp/p2pAccountCompleted'] || to.matched.some(record => record.meta.notProfile)) {
          if (to.matched.some(record => !record.meta.visitorScreen) && !store.getters['accounts/userCanSell']) {
            next({ name: 'dashboard' })
          } else {
            next()
          }
        } else {
          // console.log('Not profile completed, redirected to account')
          next({ name: 'account' })
        }
        next()
      } else if (to.path === '/login') {
        // console.log('Is send to login')
      } else {
        // console.log('Is send to return Url', to.path)
        next({ path: `/?returnUrl=${to.path}` })
      }
    } else {
      next()
    }
  })

  return Router
}
