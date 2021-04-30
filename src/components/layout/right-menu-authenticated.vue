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
      .row.bg-light
        .col.q-pt-sm
          .text-h6.q-px-md.text-dark  {{ account }}
          q-list
            q-item(clickable v-ripple to="/account")
              q-item-section(avatar)
                q-icon(name="person_outline" color="dark")
              q-item-section.text-dark {{ $t('menu.profile') }}
            q-item(clickable v-ripple @click="logout")
              q-item-section(avatar)
                q-icon(name="logout" color="dark")
              q-item-section.text-dark {{ $t('menu.logout') }}
          //- .text-h6 {{ $t('pages.account.myAccount') }}
          //- q-avatar(size='72px' icon="account_circle")
              //- img(src='https://cdn.quasar.dev/img/avatar4.jpg')
          //- q-btn(color='primary' :label="$t('common.buttons.logout')" push='' size='sm' v-close-popup='' @click="logout")
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
