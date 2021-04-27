<script>
import { mapActions, mapGetters } from 'vuex'
import ProfileMenu from './profile-menu'

export default {
  name: 'right-menu-authenticated',
  components: { ProfileMenu },
  computed: {
    ...mapGetters('accounts', ['account'])
  },
  methods: {
    ...mapActions('accounts', ['logout'])
  }
}
</script>

<template lang="pug">
.q-px-xs
  q-avatar.cursor-pointer(v-ripple icon="account_circle" size="xl")
    //- img(src='https://cdn.quasar.dev/img/avatar.png')
    q-menu
      .row.no-wrap.q-pa-md
        .column
          .text-h6.q-mb-md {{ $t('pages.account.myAccount') }}
          //- q-toggle(v-model='mobileData' label='Use Mobile Data')
          //- q-toggle(v-model='bluetooth' label='Bluetooth')
        q-separator.q-mx-lg(vertical='' inset='')
        .column.items-center
          q-avatar(size='72px' icon="account_circle")
            //- img(src='https://cdn.quasar.dev/img/avatar4.jpg')
          .text-subtitle1.q-mt-md.q-mb-xs {{ account }}
          q-btn(color='primary' :label="$t('common.buttons.logout')" push='' size='sm' v-close-popup='' @click="logout")
  //- q-btn(
  //-   to="/profiles/myProfile"
  //-   :label="account"
  //-   flat
  //-   no-caps
  //- )
  //- q-btn(
  //-   :label="$t('common.buttons.logout')"
  //-   @click="logout"
  //-   color="secondary"
  //- )
  //- profile-menu
</template>

<style lang="sass" scoped>
.text-h6
  min-width: 120px
</style>
