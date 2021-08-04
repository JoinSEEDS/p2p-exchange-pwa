import PPP from '@smontero/ppp-client-api'

export const needVerifyComm = (state) => {
  const profile = state.myProfile
  return !profile || !profile.publicData || !profile.publicData.isVerified

  // if (profile.commPref === 'EMAIL') {
  //   return !!profile.emailInfo.needsToVerify
  // } else if (profile.commPref === 'SMS') {
  //   return !!profile.smsInfo.needsToVerify
  // }
}

export const isRegistered = (state) => {
  return !!state.myProfile
}

export const isPPPLoading = (state) => {
  return state.isPPPLoading
}

export const getMyProfile = (state) => {
  return state.myProfile
}

// export const isLoggedIn = (state) => {
//   return state.myProfile
// }
export const isLoggedIn = async (state) => {
  const authApi = PPP.authApi()
  return authApi.hasValidSession()
}

export const privateKey = async (state) => {
  const profileApi = PPP.profileApi()
  const profile = await profileApi.getProfile()
  return profile.appData.privateData.privateKey
}

export const paypal = async (state) => {
  const profileApi = PPP.profileApi()
  const profile = await profileApi.getProfile()
  return profile.appData.privateData.paypal
}
