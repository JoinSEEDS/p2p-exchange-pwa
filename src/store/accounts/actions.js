
const getAuthenticator = function (ual, wallet = null) {
  wallet = wallet || localStorage.getItem('autoLogin')
  const idx = ual.authenticators.findIndex(auth => auth.constructor.name === wallet)
  return {
    authenticator: ual.authenticators[idx],
    idx
  }
}

export const login = async function ({ commit, dispatch }, { idx, account, returnUrl }) {
  const authenticator = this.$ual.authenticators[idx]
  try {
    commit('setLoadingWallet', authenticator.getStyle().text)
    await authenticator.init()
    if (!account) {
      const requestAccount = await authenticator.shouldRequestAccountName()
      if (requestAccount) {
        await dispatch('fetchAvailableAccounts', idx)
        commit('setRequestAccount', true)
        return null
      }
    }
    const users = await authenticator.login(account)
    if (users.length) {
      this.$ualUser = users[0]
      this.$type = 'ual'
      const accountName = await users[0].getAccountName()

      const isUserSeeds = await this.$userApi.checkExistUserSeeds({ accountName })
      // console.log('isUserSeeds', isUserSeeds)

      if (!isUserSeeds || !isUserSeeds.userExist) {
        commit('general/setErrorMsg', 'Please login with a seeds account.', { root: true })
        await authenticator.logout()
        localStorage.removeItem('autoLogin')
        commit('setAccount')
        commit('setSeedsAccount')
        return
      }
      commit('setAccount', accountName)
      commit('setSeedsAccount', isUserSeeds.userData)
      const defaultReturnUrl = localStorage.getItem('returning') ? '/account' : '/account'
      localStorage.setItem('autoLogin', authenticator.constructor.name)
      localStorage.setItem('account', accountName)
      localStorage.setItem('returning', true)
      const userExist = false
      const ru = userExist ? returnUrl : '/account'
      // console.log('returnUrl', returnUrl)
      // console.log('defaultReturnUrl', defaultReturnUrl)
      // console.log('ru', ru)
      // this.$router.push({ path: '/home' })
      this.$router.push({ path: ru || defaultReturnUrl })
      return this.$ualUser
    }
  } catch (e) {
    const error = (authenticator.getError() && authenticator.getError().message) || e.message || e.reason
    commit('general/setErrorMsg', error, { root: true })
    console.log('Login error: ', error)
    return null
  } finally {
    commit('setLoadingWallet')
  }
}

export const loginToBackend = async function ({ commit }) {
  try {
    await this.dispatch('profiles/getProfile', { root: true })
    return true
  } catch (e) {
    console.log('Failed to login to backend: ', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    return false
  }
}

export const logout = async function ({ commit }) {
  const { authenticator } = getAuthenticator(this.$ual)
  try {
    authenticator && await authenticator.logout()
  } catch (error) {
    console.log('Authenticator logout error', error)
  }
  // commit('profiles/setProfile', undefined, { root: true })
  commit('setAccount')
  commit('setSeedsAccount')
  localStorage.removeItem('autoLogin')
  this.$api = null
  this.$router.push({ path: '/' })
}

export const autoLogin = async function ({ dispatch, commit }, returnUrl) {
  const { authenticator, idx } = getAuthenticator(this.$ual)
  let user = null
  if (authenticator) {
    commit('setAutoLogin', true)
    console.log('autoLogin')
    user = await dispatch('login', { idx, returnUrl, account: localStorage.getItem('account') })
    commit('setAutoLogin', false)
  }
  return user
}

export const fetchAvailableAccounts = async function ({ commit }, idx) {
  commit('resetAvailableAccounts')
  const chainId = process.env.NETWORK_CHAIN_ID
  const authenticator = this.$ual.authenticators[idx]
  const map = await authenticator.getAccountNamesPerChain()
  const accounts = map.has(chainId) ? map.get(chainId) : []
  commit('setAvailableAccounts', accounts)
}
