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
