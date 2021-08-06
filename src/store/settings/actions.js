
export const getSettings = async function ({ commit }) {
  try {
    commit('general/setIsLoading', true, { root: true })
    const settings = await this.$settingsApi.getSettings({ })
    console.log('settings', settings)
    commit('settings/setSettings', settings, { root: true })
    return settings
  } catch (e) {
    console.error('An error ocurred while trying retrieve configs info', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    throw new Error(e)
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}
