import PPP from '@smontero/ppp-client-api'

export const signUp = async function ({ state }, mData) {
  PPP.setActiveUser(this.$ualUser)
  const profileApi = PPP.profileApi()
  return profileApi.register(mData)
}

export const signIn = async function ({ state }, mData) {
  console.log('SIGN IN PROFILE')
  PPP.setActiveUser(this.$ualUser)
  const authApi = PPP.authApi()
  return authApi.signIn()
}

export const hasActiveSession = async function ({ state }, mData) {
  console.log('ACTIE SESSION PROFILE')
  PPP.setActiveUser(this.$ualUser)
  const authApi = PPP.authApi()
  // const validSession = await authApi.hasValidSession()
  // console.log('authApi.hasValidSession()', validSession)
  // if (!validSession) {
  //   await authApi.signIn()
  // }

  return authApi.hasValidSession()
}

// export const logout = async function ({ commit }) {
//   await PPP.authApi().signOut()
//   commit('setAutoLogin', true)
//   const { authenticator } = getAuthenticator(this.$ual)
//   console.log(authenticator)
//   try {
//     authenticator && await authenticator.logout()
//   } catch (error) {
//     console.log('Authenticator logout error', error)
//   }
//   commit('profiles/setProfile', null, { root: true })
//   commit('setAccount', null)
//   localStorage.removeItem('autoLogin')
//   this.$api = null
//   commit('setAutoLogin', false)
//   return 'Logout success'
//   // this.$router.push({ path: '/' })
// }

// export const searchProfiles = async function ({ commit }, options = {}) {
//   const profileApi = PPP.profileApi()
//   const { search, clean, lastEvaluatedKey, limit } = options
//   try {
//     await profileApi.searchProfiles(search, limit, lastEvaluatedKey).then(response => {
//       if (clean === true) commit('clearProfilesList')
//       commit('setProfiles', response)
//     })
//   } catch (error) {
//     console.log('Error', error)
//   }
// }

// export const clearProfilesList = function ({ commit }, options = {}) {
//   commit('clearProfilesList')
// }

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

// export const verifySMS = async function ({ commit }, code) {
//   return PPP.profileApi().verifySms(code)
// }

// export const verifyEmail = async function ({ commit }, code) {
//   return PPP.profileApi().verifyEmail(code)
// }

export const setPPPLoading = async function ({ commit }, PPPLoading) {
  commit('setPPPLoading', PPPLoading)
}
