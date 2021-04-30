
export const getSellOffers = async function ({ commit }) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const response = await this.$sellOfferApi.getSellOffers({ })
    commit('sellOffers/setSellOffers', response)
    return response
  } catch (e) {
    console.error('An error ocurred while trying retrieve sale offers info', e)
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
