<script>
import { mapGetters } from 'vuex'
import LeftMenu from '~/components/layout/left-menu'
import RightMenuAuthenticated from '~/components/layout/right-menu-authenticated'
import RightMenuGuest from '~/components/layout/right-menu-guest'

export default {
  name: 'layout-auth',
  components: {
    LeftMenu,
    RightMenuAuthenticated,
    RightMenuGuest
  },
  data () {
    return {
      menu: false,
      right: false
    }
  },
  computed: {
    ...mapGetters('accounts', ['isAuthenticated'])
  }
}
</script>

<template lang="pug">
  q-layout(view="lHh Lpr lFf")
    q-header(elevated)
      q-toolbar
        q-icon(name="app:title" class="title-icon").q-mx-auto.center-icon
        right-menu-authenticated(v-if="isAuthenticated")
    q-page-container
      .row.justify-center.bg-accent
        .col-5.col-xs-12.col-sm-10.col-md-5.col-lg-6
          router-view.main-container.bg-primary
</template>

<style lang="sass" scoped>
.logo
  max-height: 30px
  max-width: 100px
.badge-left
  left: -5px
  right: auto
.main-container
  min-height: 93vh
  padding: 1px
  overflow: hidden
.title-icon
  width: 70px
  height: 25px
.center-icon
  transform: translateX(40%)
</style>
