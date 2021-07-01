const routes = [
  // { path: '/', component: () => import('pages/index.vue'), meta: { layout: 'empty', guest: true } },
  { path: '/', component: () => import('pages/login/login.vue'), meta: { layout: 'guest', title: 'pages.login.title', guest: true } },
  { path: '/home', component: () => import('pages/home/home.vue'), name: 'home' },
  { path: '/account', component: () => import('pages/account/accountScreen.vue'), name: 'account', meta: { title: 'pages.login.title', notProfile: true, visitorScreen: true } },
  { path: '/dashboard', component: () => import('pages/dashboard/dashboardScreen.vue'), name: 'dashboard', meta: { visitorScreen: true } },
  { path: '/sell', component: () => import('pages/sell/sellScreen.vue'), name: 'sell' },
  { path: '/offers', component: () => import('pages/buy/offersScreen.vue'), name: 'sellOffers', meta: { visitorScreen: true } },
  { path: '/buy/:id', component: () => import('pages/buy/buyOfferScreen.vue'), name: 'buy', meta: { visitorScreen: true } },
  { path: '/make-payment/:id', component: () => import('pages/make-payment/make-payment.vue'), name: 'make-payment' },
  // { path: '/make-payment', component: () => import('pages/buy-offer/buy-offer.vue'), name: 'buy-offer' },
  { path: '/incoming-buy-offers/:id', component: () => import('pages/offers/incomingBuyOffers.vue'), name: 'incoming-buy-offers' }

]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/404.vue'),
    meta: { layout: 'empty' }
  })
}

export default routes
