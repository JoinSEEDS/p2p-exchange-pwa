import PPP from '@smontero/ppp-client-api'

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

      if (!isUserSeeds || !isUserSeeds.userExist) {
        commit('general/setErrorMsg', 'Please login with a seeds account.', { root: true })
        await authenticator.logout()
        localStorage.removeItem('autoLogin')
        commit('setAccount')
        commit('setSeedsAccount')
        commit('setP2PAccount')
        commit('setCurrentSeedsPerUsd')
        commit('setP2PBalances')
        return
      }

      // Getting user info
      PPP.setActiveUser(this.$ualUser)
      const authApi = PPP.authApi()
      const validSession = await authApi.hasValidSession()
      if (!validSession) await authApi.signIn()
      const profileApi = PPP.profileApi()
      const profile = await profileApi.getProfile()

      commit('setAccount', accountName)
      commit('setSeedsAccount', isUserSeeds.userData)
      commit('setP2PAccount', profile)
      await dispatch('getBalances')
      await dispatch('getCurrentSeedsPerUsd')
      await dispatch('getFiatExchanges')

      localStorage.setItem('autoLogin', authenticator.constructor.name)
      localStorage.setItem('account', accountName)
      localStorage.setItem('returning', true)

      this.$router.push({ path: returnUrl || '/dashboard' })

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
  await PPP.authApi().signOut()
  // commit('profiles/setProfile', null, { root: true })

  const { authenticator } = getAuthenticator(this.$ual)
  try {
    authenticator && await authenticator.logout()
  } catch (error) {
    console.log('Authenticator logout error', error)
  }
  // commit('profiles/setProfile', undefined, { root: true })
  commit('setAccount')
  commit('setSeedsAccount')
  commit('setCurrentSeedsPerUsd')
  commit('setP2PBalances')
  localStorage.removeItem('autoLogin')
  localStorage.removeItem('account')
  localStorage.removeItem('returning')
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
    const userAccount = await this.$accountApi.getAccountInfo({ accountName })
    commit('setP2PAccount', userAccount.rows[0])
    return userAccount
  } catch (e) {
    console.error('An error ocurred while trying to get account info', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    throw new Error(e)
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}

export const getBalances = async function ({ commit }) {
  try {
    // commit('general/setIsLoading', true, { root: true })
    const accountName = this.getters['accounts/account']
    const balances = await this.$balanceApi.getBalanceByAccount({ accountName })
    if (balances && balances.rows[0]) {
      commit('setP2PBalances', balances.rows[0])
    }
    // commit('balances/setBalances', balances.rows, { root: true })
    // return userAccount
  } catch (e) {
    console.error('An error ocurred while trying to get account info', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    throw new Error(e)
  } finally {
    // commit('general/setIsLoading', false, { root: true })
  }
}

export const getFiatExchanges = async function ({ commit }) {
  try {
    // commit('general/setIsLoading', true, { root: true })
    const { data } = await this.$balanceApi.getFiatExchanges()
    // Parsing object key to array
    // const arrayRates = []
    // Object.keys(data.rates).forEach(function (key) {
    //   arrayRates.push(data.rates[key])
    //   // ...
    // })
    // data.rates = arrayRates
    if (data) {
      commit('setFiatExchanges', data)
    }
  } catch (e) {
    console.error('An error ocurred while trying to get fiat exchange rates', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    throw new Error(e)
  } finally {
    // commit('general/setIsLoading', false, { root: true })
  }
}

export const getCurrentSeedsPerUsd = async function ({ commit }) {
  try {
    const currentSeedsPerUsd = await this.$seedsValueApi.getCurrentPricePerUSD()
    commit('setCurrentSeedsPerUsd', currentSeedsPerUsd)
  } catch (e) {
    console.error('An error ocurred while trying to get account info', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    throw new Error(e)
  } finally {
    // commit('general/setIsLoading', false, { root: true })
  }
}

export const saveAccountData = async function ({ commit, dispatch }, params) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const accountName = this.getters['accounts/account']
    const response = await this.$accountApi.saveAccountData({ ...params, accountName }) // <<- HERE
    // dispatch('accounts/getAccountInfo', true, { root: true })
    dispatch('getAccountInfo', { })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to save account info', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    throw new Error(e)
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}

export const withdraw = async function ({ commit }, params) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const accountName = this.getters['accounts/account']
    const response = await this.$accountApi.withdraw({ ...params, accountName })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to do a withdraw', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    throw new Error(e)
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}

export const deposit = async function ({ commit }, params) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const accountName = this.getters['accounts/account']
    const response = await this.$accountApi.deposit({ ...params, accountName })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to do a deposit', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    throw new Error(e)
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}
