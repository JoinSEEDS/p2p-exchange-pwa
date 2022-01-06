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
      idx: null,
      accountName: ''
    }
  },
  computed: {
    ...mapGetters('accounts', ['loading'])
  },
  watch: {
    accountName (v, old) {
      if (v !== old) this.accountName = v.toLowerCase()
    }
  },
  methods: {
    ...mapActions('accounts', ['login', 'autoLogin', 'loginPPP']),
    setAccountNameFromLw (accountName) {
      this.accountName = accountName
    },
    async onLogin (idx) {
      this.idx = idx
      await this.login({ idx: this.idx, returnUrl: '/dashboard' })
    },
    async onLoginPPP () {
      try {
        console.log('onLoginPPP')
        if (this.accountName.length === 12) {
          await this.loginPPP({ returnUrl: '/dashboard', accountName: this.accountName.toLowerCase() })
        } else {
          this.showErrorMsg('The account name must be 12 length')
        }
      } catch (e) {
        console.error(e)
      }
    },
    async onAccountEntered (account) {
      await this.login({ idx: this.idx, account, returnUrl: this.$route.query.returnUrl })
    },
    openUrl (url) {
      window.open(url)
    }
  },
  async mounted () {
    if (this.accountName.length < 1) {
      window.onLogin.postMessage('Requesting Login account name')
    }
    await this.autoLogin(this.$route.query.returnUrl)
    window.setAccountNameFromLw = this.setAccountNameFromLw
  }
}
</script>

<template lang="pug">
.row.justify-center
  .col-sm-10.col-xs-12.col-md-6
    .cm
      .c1.background-login
      q-list.q-pa-xl.wallets-container
        q-input(
          label="Seeds Account Name"
          outlined
          dark
          standout="text-accent"
          v-model="accountName"
          readonly
        )
        //- .label.text-white.q-mb-md Login
        q-item.q-my-md.wallet-item.bg-accent.text-white(
          v-ripple
          @click="onLoginPPP()"
        )
          .logo-wallet-container.cursor-pointer.logo-background
            q-icon(
              name="login"
              color="white"
              @click="onLoginPPP()"
            )
          .cursor-pointer.wallet-name(@click="onLoginPPP()")
            .q-ml-md.text-center Login
        //- .label.text-white.q-mb-md Select your wallet
        //- q-item.q-my-md.wallet-item(
        //-   v-for="(wallet, idx) in $ual.authenticators"
        //-   :key="wallet.getStyle().text"
        //-   :style="{ background: wallet.getStyle().background, color: wallet.getStyle().textColor }"
        //-   v-if="wallet.shouldRender()"
        //-   v-ripple
        //- )
        //-   .logo-wallet-container.cursor-pointer.logo-background(
        //-     @click="onLogin(idx)"
        //-   )
        //-     img(
        //-       :src="wallet.getStyle().icon"
        //-       width="30"
        //-     )
        //-   .cursor-pointer.wallet-name(@click="onLogin(idx)")
        //-     .q-ml-md {{ wallet.getStyle().text }}
        //-   .flex
        //-       q-spinner.q-mt-xs(
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
    //- request-account(
    //-   @accountEntered="onAccountEntered"
    //- )

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
  text-align: center
  flex: 0.95
.info-container
  vertical-align: middle
  justify-items: center
  align-items: center
.background-login
  background-image: url("../../statics/backgrounds/Log_in_V1_sm.svg")
  background-position: bottom
  background-repeat: no-repeat
  background-size: auto
  @media screen and ( max-width: 600px )
    background-size: cover
.cm
  display: flex
  flex-direction: column
  flex: 1
  height: 97vh
.c1
  flex: 1.5
  justify-self: center
.wallets-container
  flex: 1
</style>
