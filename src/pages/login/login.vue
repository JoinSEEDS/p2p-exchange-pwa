<script>
import { mapActions, mapGetters } from 'vuex'
import RequestAccount from './components/request-account'

export default {
  name: 'page-login',
  components: {
    RequestAccount
  },
  data () {
    return {
      idx: null
    }
  },
  computed: {
    ...mapGetters('accounts', ['loading'])
  },
  methods: {
    ...mapActions('accounts', ['login', 'autoLogin']),
    async onLogin (idx) {
      this.idx = idx
      await this.login({ idx: this.idx, returnUrl: '/home' })
    },
    async onAccountEntered (account) {
      await this.login({ idx: this.idx, account, returnUrl: this.$route.query.returnUrl })
    },
    openUrl (url) {
      window.open(url)
    }
  },
  async mounted () {
    await this.autoLogin(this.$route.query.returnUrl)
  }
}
</script>

<template lang="pug">
.row.justify-center.background-login
  .col-sm-10.col-xs-12.col-md-6
    .cm
      .c1
      q-list.q-pa-xl.wallets-container
        .label.text-white.q-mb-md Select your wallet
        q-item.q-my-md.wallet-item(
          v-for="(wallet, idx) in $ual.authenticators"
          :key="wallet.getStyle().text"
          :style="{ background: wallet.getStyle().background, color: wallet.getStyle().textColor }"
          v-if="wallet.shouldRender()"
          v-ripple
        )
          .logo-wallet-container.cursor-pointer.logo-background(
            @click="onLogin(idx)"
          )
            img(
              :src="wallet.getStyle().icon"
              width="30"
            )
          .cursor-pointer.wallet-name(@click="onLogin(idx)")
            .q-ml-md {{ wallet.getStyle().text }}
          .flex
              q-spinner.q-mt-xs(
                v-if="loading === wallet.getStyle().text"
                :color="wallet.getStyle().textColor"
                size="2em"
              )
              q-btn(
                v-else
                :color="wallet.getStyle().textColor"
                icon="fas fa-download"
                @click="openUrl(wallet.getOnboardingLink())"
                target="_blank"
                dense
                flat
                size="12px"
              )
                q-tooltip {{ $t('pages.login.getApp') }}
      //- q-item.q-my-md(
      //-   v-for="(wallet, idx) in $ual.authenticators"
      //-   :key="wallet.getStyle().text"
      //-   v-ripple
      //-   :style="{ background: wallet.getStyle().background, color: wallet.getStyle().textColor }"
      //-   v-if="wallet.shouldRender()"
      //- )
      //-   q-item-section.cursor-pointer.logo-background(
      //-     @click="onLogin(idx)"
      //-   )
      //-     img(
      //-       :src="wallet.getStyle().icon"
      //-       width="30"
      //-     )
      //-   q-item-section.cursor-pointer(@click="onLogin(idx)") {{ wallet.getStyle().text }}
      //-   q-item-section(avatar)
      //-     .flex
      //-       q-spinner(
      //-         v-if="loading === wallet.getStyle().text"
      //-         :color="wallet.getStyle().textColor"
      //-         size="2em"
      //-       )
      //-       q-btn(
      //-         v-else
      //-         :color="wallet.getStyle().textColor"
      //-         icon="fas fa-download"
      //-         @click="openUrl(wallet.getOnboardingLink())"
      //-         target="_blank"
      //-         dense
      //-         flat
      //-         size="12px"
      //-       )
      //-         q-tooltip {{ $t('pages.login.getApp') }}
    request-account(
      @accountEntered="onAccountEntered"
    )

</template>

<style lang="sass" scoped>
.imgLogin
  width: 200px
.imgContainer
  text-align: center
  padding: 20px
.wallet-item
  border-radius: 10px
  display: flex
  flex-direction: row !important
  padding: 0px !important
.logo-background
  background-color: rgba(0, 0 , 0 , 0.5)
.logo-wallet-container
  // display: contents
  width: 40px
  padding: 5px 30px 5px 30px
  border-radius: 10px 0px 0px 10px
  text-align: center
  align-items: center
  justify-content: center
  display: flex
.wallet-name
  display: flex
  justify-items: center
  align-items: center
  flex: 0.95
.info-container
  vertical-align: middle
  justify-items: center
  align-items: center
.background-login
  background-image: url("../../statics/backgrounds/Log_in_V1.svg")
  background-color: $primary
  background-repeat: no-repeat
  background-size: cover
  // display: flex
  // flex: 1
.cm
  display: flex
  flex-direction: column
  flex: 1
  height: 97vh
.c1
  flex: 1.5
  // background-color: blue
.wallets-container
  flex: 1
  // position: static
  // position: sticky
  // bottom: 10px
  // background-image: url("../../backgrounds.svg")
</style>
