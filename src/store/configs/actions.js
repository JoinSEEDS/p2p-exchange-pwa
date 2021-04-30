
export const getConfigs = async function ({ commit }) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const response = await this.$configApi.getConfigs({ })
    commit('configs/setConfigs', response)
    return response
  } catch (e) {
    console.error('An error ocurred while trying retrieve configs info', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    throw new Error(e)
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}
