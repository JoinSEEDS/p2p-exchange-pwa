export const setArbiterToOffer = async function ({ commit }, { offerId }) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const arbiter = this.getters['accounts/account']
    const response = await this.$arbitrationApi.setArbiterToOffer({ arbiter, offerId })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to set arbiter', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    return null
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}

export const initArbiter = async function ({ commit }, { offerId }) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const response = await this.$arbitrationApi.initArbiter({ offerId })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to set arbiter', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    return null
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}

export const resolveToBuyer = async function ({ commit }, { offerId, notes }) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const response = await this.$arbitrationApi.resolveToBuyer({ offerId, notes })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to set arbiter', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    return null
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}

export const resolveToSeller = async function ({ commit }, { offerId, notes }) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const response = await this.$arbitrationApi.resolveToSeller({ offerId, notes })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to set arbiter', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    return null
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}

export const getAssignetTicketByArbiter = async function ({ commit }, params) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const accountName = this.getters['accounts/account']
    const response = await this.$arbitrationApi.getAssignetTicketByArbiter({ ...params, arbiter: accountName })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to set arbiter', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    return null
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}

export const getAvailableTicket = async function ({ commit }, params) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const response = await this.$arbitrationApi.getAssignetTicketByArbiter({ ...params, arbiter: 'pending' })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to set arbiter', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    return null
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}
