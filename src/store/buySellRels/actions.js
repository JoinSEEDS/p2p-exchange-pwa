
export const getBuySellRels = async function ({ commit }) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const response = await this.$buySellRelApi.getBuySellRels({ })
    commit('buySellRels/setBuySellRels', response)
    return response
  } catch (e) {
    console.error('An error ocurred while trying retrieve buy offers info', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    throw new Error(e)
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}

export const getBuyOffersBySellOffer = async function ({ commit }, { sellOfferId }) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const response = await this.$buySellRelApi.getBuyOffersBySellOffer({ sellOfferId })
    return response
  } catch (e) {
    console.error('An error ocurred while trying retrieve buy offers info', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    throw new Error(e)
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}
