
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
        commit('setP2PAccount')
        return
      }

      // Getting user info
      const userAccount = await this.$accountApi.getAccountInfo({ accountName })
      // console.log('userAccount', userAccount)

      commit('setAccount', accountName)
      commit('setSeedsAccount', isUserSeeds.userData)
      commit('setP2PAccount', userAccount.rows[0])

      // const defaultReturnUrl = localStorage.getItem('returning') ? '/account' : '/account'
      localStorage.setItem('autoLogin', authenticator.constructor.name)
      localStorage.setItem('account', accountName)
      localStorage.setItem('returning', true)
      const userExist = false
      const ru = userExist ? returnUrl : '/dashboard'
      // console.log('returnUrl', returnUrl)
      // console.log('defaultReturnUrl', defaultReturnUrl)
      console.log('ru', ru)
      // this.$router.push({ path: '/home' })
      this.$router.push({ path: returnUrl || 'dashboard' })
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

export const getAccountInfo = async function ({ commit }, { entryStatus, offset, limit }) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const accountName = this.getters['accounts/account']
    return this.$accountApi.getAccountInfo({ accountName })
  } catch (e) {
    console.error('An error ocurred while trying to get account info', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    throw new Error(e)
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}

export const saveAccountData = async function ({ commit }, params) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const accountName = this.getters['accounts/account']
    const response = await this.$accountApi.saveAccountData({ ...params, accountName })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to save account info', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    throw new Error(e)
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}
