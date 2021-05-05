
export const getTrxStats = async function ({ commit }) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const response = await this.$trxStatApi.getTrxStats({ })
    commit('trxStats/setTrxStats', response)
    return response
  } catch (e) {
    console.error('An error ocurred while trying retrieve trx stats info', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    throw new Error(e)
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}
