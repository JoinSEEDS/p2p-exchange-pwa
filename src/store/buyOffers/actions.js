
export const createBuyOffer = async function ({ commit }, params) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const accountName = this.getters['accounts/account']
    const response = await this.$buyOfferApi.addBuyOffer({ accountName, ...params })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to create buy offer', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    throw new Error(e)
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}

export const acceptBuyOffer = async function ({ commit }, params) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const accountName = this.getters['accounts/account']
    const response = await this.$buyOfferApi.acceptBuyOffer({ accountName, ...params })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to accept buy offer', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    throw new Error(e)
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}
export const cancelBuyOffer = async function ({ commit }, params) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const accountName = this.getters['accounts/account']
    const response = await this.$buyOfferApi.cancelBuyOffer({ accountName, ...params })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to cancel buy offer', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    throw new Error(e)
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}

export const payOffer = async function ({ commit }, params) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const accountName = this.getters['accounts/account']
    const response = await this.$buyOfferApi.payOffer({ accountName, ...params })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to accept buy offer', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    throw new Error(e)
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}

export const confirmPayment = async function ({ commit }, params) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const accountName = this.getters['accounts/account']
    const response = await this.$buyOfferApi.confirmPayment({ accountName, ...params })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to accept buy offer', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    throw new Error(e)
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}

export const getMyBuyOffers = async function ({ commit }, params) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const accountName = this.getters['accounts/account']
    return this.$offersApi.getBuyOfferByUser({ ...params, accountName })
  } catch (e) {
    console.error('An error ocurred while trying retrieve my buy offers info', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    throw new Error(e)
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}

export const getOffer = async function ({ commit }, offerId) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const response = await this.$offersApi.getOffer(offerId)
    return response
  } catch (e) {
    console.error('An error ocurred while trying retrieve buy offers info', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    throw new Error(e)
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}
