
export const getSellOffers = async function ({ commit }, params) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const response = await this.$offersApi.getSellOffers({
      ...params
    })
    return response
  } catch (e) {
    console.error('An error ocurred while trying retrieve buy offers info', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    throw new Error(e)
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}

export const getMySellOffers = async function ({ commit }, params) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const accountName = this.getters['accounts/account']
    return this.$offersApi.getSellOfferByUser({ ...params, accountName })
  } catch (e) {
    console.error('An error ocurred while trying retrieve my sell offers', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    throw new Error(e)
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}

export const getBuyOffersBySaleOffer = async function ({ commit }, params) {
  try {
    commit('general/setIsLoading', true, { root: true })
    // const accountName = this.getters['accounts/account']
    return this.$offersApi.getBuyOffersBySaleOffer({ ...params })
  } catch (e) {
    console.error('An error ocurred while trying retrieve my sell offers', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    throw new Error(e)
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}

export const getSellOffersByTimeZone = async function ({ commit }, params) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const response = await this.$offersApi.getSellOffers({
      ...params
    })
    return response
  } catch (e) {
    console.error('An error ocurred while trying retrieve buy offers info', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    throw new Error(e)
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}

export const addSellOffer = async function ({ commit }, params) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const accountName = this.getters['accounts/account']
    const response = await this.$sellOfferApi.addSellOffer({ accountName, ...params })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to add sale offer', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    throw new Error(e)
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}

export const delSellOffer = async function ({ commit }, params) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const response = await this.$sellOfferApi.delSellOffer({ ...params })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to delete sale offer', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    throw new Error(e)
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}

export const getSellOfferById = async function ({ commit }, offerId) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const response = await this.$offersApi.getOffer(offerId)
    return response
  } catch (e) {
    console.error('An error ocurred while trying to delete sale offer', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    throw new Error(e)
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}
