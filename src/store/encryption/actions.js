import PPP from '@smontero/ppp-client-api'

export const generateKeys = async function ({ commit }) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const response = await this.$encrypionApi.generateKeys()
    return response
  } catch (e) {
    console.error('An error ocurred while trying to do a deposit', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    throw new Error(e)
  } finally {
  }
}

export const createMessage = async function ({ commit, dispatch }, { message, recipientAccount, buyOfferId }) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const privateKey = await dispatch('profiles/getPrivateKey', {}, { root: true })
    const response = await this.$encrypionApi.createMessage({ privateKey, recipientAccount, message, buyOfferId })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to do a deposit', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    throw new Error(e)
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}

export const receiveMessage = async function ({ commit, dispatch }, { buyOfferId }) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const recipientPrivateKey = await dispatch('profiles/getPrivateKey', {}, { root: true })
    const response = await this.$encrypionApi.receiveMessage({ recipientPrivateKey, buyOfferId })
    return response[0]
  } catch (e) {
    console.error('An error ocurred while trying to do a deposit', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    throw new Error(e)
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}

export const receiveContactMethods = async function ({ commit, dispatch }, { buyOfferId }) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const arbiter = this.getters['accounts/account']

    const recipientPrivateKey = await dispatch('profiles/getPrivateKey', {}, { root: true })
    const response = await this.$encrypionApi.receiveMessage({ recipientPrivateKey, buyOfferId, arbiter })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to do a deposit', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    throw new Error(e)
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}

export const addPublicKey = async function ({ commit }, { publicKey }) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const account = this.getters['accounts/account']
    const response = await this.$encrypionApi.addPublicKey({ account, publicKey })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to do a deposit', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    throw new Error(e)
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}

export const signUpPPP = async function ({ state }, mData) {
  PPP.setActiveUser(this.$ualUser)
  const profileApi = PPP.profileApi()
  return profileApi.register(mData)
}
