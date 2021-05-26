
export const getBuyOffers = async function ({ commit }) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const response = await this.$buyOffersApi.getBuyOffers({ })
    commit('buyOffers/setBuyOffers', response)
    return response
  } catch (e) {
    console.error('An error ocurred while trying retrieve buy offers info', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    throw new Error(e)
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}

export const getOffers = async function ({ commit }, params) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const response = await this.$offersApi.getOffers({
      ...params,
      offset: 0,
      limit: 5
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
