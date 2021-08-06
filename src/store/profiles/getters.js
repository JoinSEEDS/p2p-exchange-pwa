import PPP from '@smontero/ppp-client-api'

export const needVerifyComm = (state) => {
  const profile = state.myProfile
  return !profile || !profile.publicData || !profile.publicData.isVerified
}

export const isPPPLoading = (state) => {
  return state.isPPPLoading
}

export const isLoggedIn = async (state) => {
  // PPP.setActiveUser(this.$ualUser)
  const authApi = PPP.authApi()
  const validSession = await authApi.hasValidSession()
  if (!validSession) await authApi.signIn()
  return authApi.hasValidSession()
}
