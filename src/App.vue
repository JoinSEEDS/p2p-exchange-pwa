<script>
import { mapGetters } from 'vuex'
import appIcons from '~/utils/app-icons'
import esrModal from '~/components/esr-modal'

export default {
  name: 'App',
  components: { esrModal },
  computed: {
    ...mapGetters('accounts', ['isAutoLoading']),
    ...mapGetters('general', ['isLoading', 'errorMsg', 'successMsg', 'esrRequest', 'isRequestingESR']),
    layout () {
      return `layout-${this.$route.meta.layout || 'main'}`
    }
  },
  watch: {
    errorMsg (msg) {
      if (msg) {
        this.showNotification(msg, 'error')
        this.showErrorMsg(null)
      }
    },
    successMsg (msg) {
      if (msg) {
        this.showNotification(msg, 'success')
        this.showSuccessMsg(null)
      }
    },
    isLoading (value) {
      if (value) {
        this.$q.loading.show()
      } else {
        this.$q.loading.hide()
      }
    }
  },
  created () {
    this.$q.iconMapFn = (iconName) => {
      const icon = appIcons[iconName]
      if (icon !== void 0) {
        return { icon }
      }
    }
  }
}
</script>

<template lang="pug">
  .q-app
    component(:is="layout")
      router-view
    q-inner-loading(:showing="isAutoLoading")
      q-spinner(size="3em")
    esr-modal(:esrRequest="esrRequest")
</template>
