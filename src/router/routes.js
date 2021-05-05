const routes = [
  // { path: '/', component: () => import('pages/index.vue'), meta: { layout: 'empty', guest: true } },
  { path: '/', component: () => import('pages/login/login.vue'), meta: { layout: 'guest', title: 'pages.login.title', guest: true } },
  { path: '/home', component: () => import('pages/home/home.vue'), name: 'home' },
  { path: '/account', component: () => import('pages/account/accountScreen.vue'), name: 'account', meta: { title: 'pages.login.title', notProfile: true } },
  { path: '/dashboard', component: () => import('pages/dashboard/dashboardScreen.vue'), name: 'dashboard' },
  { path: '/sell', component: () => import('pages/sell/sellScreen.vue'), name: 'sell', meta: { notVisitor: true } }
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
