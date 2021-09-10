import PPP from '@smontero/ppp-client-api'

export const signUp = async function ({ state }, mData) {
  // console.log('signUp!', mData)
  PPP.setActiveUser(this.$ualUser)
  const profileApi = PPP.profileApi()
  return profileApi.register(mData)
}

export const signIn = async function ({ state }) {
  PPP.setActiveUser(this.$ualUser)
  const authApi = PPP.authApi()
  const validSession = await authApi.hasValidSession()
  if (!validSession) await authApi.signIn()
  // const profileApi = PPP.profileApi()
  // await profileApi.getProfile()
}

export const getPaypal = async function ({ state }) {
  const profileApi = PPP.profileApi()
  const profile = await profileApi.getProfile()
  return (profile && profile.appData && profile.appData.privateData) ? profile.appData.privateData.paypal : ''
}
export const getContactMethod = async function ({ state }) {
  const profileApi = PPP.profileApi()
  const profile = await profileApi.getProfile()
  if ((profile && profile.appData && profile.appData.privateData)) {
    return `${profile.appData.privateData.prefContactMeth}/${profile.appData.privateData.prefContactMethValue}`
  }
  return undefined
}
export const getPrivateKey = async function ({ state }) {
  const profileApi = PPP.profileApi()
  const profile = await profileApi.getProfile()
  return (profile && profile.appData && profile.appData.privateData) ? profile.appData.privateData.privateKey : ''
}

export const isRegistered = async function ({ state }) {
  const profileApi = PPP.profileApi()
  const profile = await profileApi.getProfile()
  return (!!profile && !!profile.appData && !!profile.appData.privateData)
}

export const searchProfiles = async function ({ commit }, options = {}) {
  const profileApi = PPP.profileApi()
  const { search, clean, lastEvaluatedKey, limit } = options
  try {
    await profileApi.searchProfiles(search, limit, lastEvaluatedKey).then(response => {
      if (clean === true) commit('clearProfilesList')
      commit('setProfiles', response)
    })
  } catch (error) {
  }
}

export const clearProfilesList = function ({ commit }, options = {}) {
  commit('clearProfilesList')
}

export const getProfile = async function ({ commit }) {
  const profileApi = PPP.profileApi()
  try {
    const profile = await profileApi.getProfile()
    // commit('setProfile', profile)
    return profile
  } catch (error) {
    commit('general/setErrorMsg', error.message || error, { root: true })
  }
}

export const verifySMS = async function ({ commit }, code) {
  return PPP.profileApi().verifySms(code)
}

export const verifyEmail = async function ({ commit }, code) {
  return PPP.profileApi().verifyEmail(code)
}

export const setPPPLoading = async function ({ commit }, PPPLoading) {
  commit('setPPPLoading', PPPLoading)
}
