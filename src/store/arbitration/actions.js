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

export const getTicketById = async function ({ commit }, { id }) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const response = await this.$arbitrationApi.getTicket({ id })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to get ticket', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    return null
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}

export const sendContactMethods = async function ({ commit }, { messageData }) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const response = await this.$arbitrationApi.sendContactMethods({ messageData })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to send contact methods', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    return null
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}

export const getIsContactMethodSentByAccount = async function ({ commit }, { buyOfferId, isBuyer }) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const accountName = this.getters['accounts/account']
    const { rows } = await this.$arbitrationApi.getIsContactMethodSentByAccount({ buyOfferId })
    const ticket = rows[0]
    if (ticket) {
      if (accountName === ticket.buyer_contact[0].key) {
        if (ticket.buyer_contact[0].value === 1) {
          return true
        }
      } else if (accountName === ticket.seller_contact[0].key) {
        if (ticket.seller_contact[0].value === 1) {
          return true
        }
      } else return false
    } else {
      return false
    }
  } catch (e) {
    console.error('An error ocurred while trying to get is contact method sent by account', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    return null
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}
