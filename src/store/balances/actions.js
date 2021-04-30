
export const getBalances = async function ({ commit }) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const response = await this.$balanceApi.getBalances({ })
    commit('balances/setBalances', response)
    return response
  } catch (e) {
    console.error('An error ocurred while trying retrieve balances info', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    throw new Error(e)
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}

export const getBalanceByAccount = async function ({ commit }) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const accountName = this.getters['accounts/account']
    const response = await this.$balanceApi.getBalanceByAccount({ accountName })
    return response
  } catch (e) {
    console.error('An error ocurred while trying retrieve balances info', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    throw new Error(e)
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}
