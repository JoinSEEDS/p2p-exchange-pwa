export const saveAccountData = async function ({ commit, dispatch }, params) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const accountName = this.getters['accounts/account']
    const response = await this.$accountApi.saveAccountData({ ...params, accountName }) // <<- HERE
    // dispatch('accounts/getAccountInfo', true, { root: true })
    dispatch('getAccountInfo', { })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to save account info', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    throw new Error(e)
  } finally {
    // commit('general/setIsLoading', false, { root: true })
  }
}
