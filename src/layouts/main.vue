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
  },
  methods: {
    // ...mapActions('accounts', ['autoLogin'])
  }
}
</script>

<template lang="pug">
  q-layout(view="lHh Lpr lFf")
    q-header(elevated)
      q-toolbar
        q-icon(name="app:title" class="title-icon")
        //- q-btn(
        //-   flat
        //-   dense
        //-   round
        //-   @click="menu = !menu"
        //-   icon="fas fa-bars"
        //-   aria-label="Menu"
        //- )
        q-toolbar-title.flex.items-center
          //- img.logo(src="statics/telos-logo-white.svg")
        right-menu-authenticated(v-if="isAuthenticated")
        //- right-menu-guest(v-if="!isAuthenticated")
    //- q-drawer(
    //-   show-if-above
    //-   v-model="menu"
    //-   side="left"
    //-   bordered
    //- )
    //-   left-menu
    q-page-container
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
  min-height: 91.5vh
  padding: 10px
.title-icon
  width: 70px
  height: 25px
</style>
