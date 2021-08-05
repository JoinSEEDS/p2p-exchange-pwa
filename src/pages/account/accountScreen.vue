<template lang="pug">
 #container
    q-icon.cursor-pointer(v-if="isP2PProfileCompleted" name="keyboard_backspace" color="white" size="md" @click="$router.replace({ name: 'dashboard' })")
    .row.justify-center
      img.logoImg(src="../../statics/backgrounds/simple_logo.svg")
    .row.justify-center
      .col-xs-12.col-sm-8
        .text-h5.text-white {{$t('pages.account.nickname')}}
        .text-weight-bold.text-white.q-mt-sm {{$t('pages.account.generalInformation')}}
        q-form.q-gutter-y-md.q-mt-sm(@submit="onSubmitForm" ref="form")
          q-input(
            :label="$t('pages.account.nickname')"
            v-model="params.nickname"
            outlined
            dark
            standout="text-accent"
            :rules="[rules.required]"
            lazy-rules
            readonly
          )
          q-select(
            :label="$t('pages.account.timeZone')"
            v-model="params.timeZone"
            outlined
            dark
            standout="text-accent"
            color="white"
            :options="CommonTimeZoneOptions"
            emit-value
            map-options
            lazy-rules
            :rules="[rules.required]"
          )
          q-select(
            :label="$t('pages.account.preferredFiatCurrency')"
            v-model="params.fiatCurrency"
            outlined
            dark
            standout="text-accent"
            :options="commonCurrenciesOptions"
            emit-value
            map-options
            color="white"
            lazy-rules
            :rules="[rules.required]"
          )
          //- q-select(
          //-   label="Preferred Contact Method"
          //-   v-model="params.contactMethods"
          //-   outlined
          //-   dark
          //-   standout="text-accent"
          //-   :options="options.contactMethods"
          //-   emit-value
          //-   map-options
          //-   color="white"
          //-   :rules="[rules.required]"
          //- )
          q-separator.full-width(dark)
          .text-weight-bold.text-white  {{$t('pages.account.enterPaypalLink')}}
          q-input(
            :label="$t('pages.account.paypalLink')"
            v-model="params.paypalLink"
            outlined
            dark
            standout="text-accent"
            :rules="[rules.required]"
            prefix="https://paypal.me/"
            lazy-rules
            :hint="$t('pages.account.hintPaypal')"
            autocomplete="off"
          )
              template(v-slot:append)
                q-icon.animated-icon.cursor-pointer.linkBtn(
                  name="open_in_new" @click="openPayPalLink"
                  v-show="params.paypalLink"
                )
                  q-tooltip {{ $t('pages.account.hintPaypal') }}
          .row.bg-primary.btnSave.q-py-sm
            q-btn.full-width(
              :label="$t('common.buttons.save')"
              color="accent"
              type="submit"
            )
</template>

<script>
import { validation } from '~/mixins/validation'
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import { CommonCurrencies, CommonTimeZone } from '~/const'
import { RootFields } from '@smontero/ppp-common'
import { utils } from '~/mixins/utils'

export default {
  name: 'account',
  mixins: [validation, utils],
  data () {
    return {
      params: {
        nickname: undefined,
        fiatCurrency: undefined,
        contactMethods: undefined,
        paypalLink: undefined,
        timeZone: undefined
      },
      options: {
        contactMethods: [
          {
            label: 'Email',
            value: 'email'
          },
          {
            label: 'Cellphone',
            value: 'cellphone'
          }
        ]
      }
    }
  },
  mounted () {
    console.log('mounted')
    this.params = {}
    this.loadProfileData()
  },
  computed: {
    ...mapState('accounts', ['p2pAccount', 'seedsAccount']),
    ...mapGetters('accounts', ['isP2PProfileCompleted']),
    ...mapGetters('profiles', ['isRegistered', 'isLoggedIn', 'paypal', 'privateKey']),
    commonCurrenciesOptions () {
      const options = []
      for (let currency in CommonCurrencies) {
        options.push({
          label: `${CommonCurrencies[currency].name} (${CommonCurrencies[currency].symbol})`,
          value: CommonCurrencies[currency].code.toLowerCase()
        })
      }
      return options
    },
    CommonTimeZoneOptions () {
      return CommonTimeZone.map(v => {
        return {
          label: v.text,
          value: v.abbr.toLowerCase()
        }
      })
    }
  },
  methods: {
    ...mapActions('accounts', ['saveAccountData', 'getPublicKey']),
    ...mapActions('profiles', ['signUp', 'signIn', 'getPaypal']),
    ...mapActions('encryption', ['generateKeys', 'addPublicKey']),
    ...mapMutations('general', ['setIsLoading']),
    async loadProfileData () {
      this.setIsLoading(true)
      let isRegistered = await this.isRegistered // <<- PPP registered

      if (!this.isP2PProfileCompleted) { // <<- Registered in P2P validation
        this.params.nickname = this.seedsAccount.nickname
        this.setIsLoading(false)
        return
      }

      let paypal = (isRegistered) ? await this.getPaypal() : ''
      this.params = {
        nickname: this.seedsAccount.nickname,
        fiatCurrency: this.p2pAccount.fiat_currency,
        contactMethods: undefined,
        paypalLink: paypal.replace('https://paypal.me/', ''),
        timeZone: this.p2pAccount.time_zone
      }
      paypal = undefined
      // console.log('PARAMS OF DATA', this.params)
      this.setIsLoading(false)
    },
    async onSubmitForm () {
      try {
        this.setIsLoading(true)
        let isRegistered = await this.isRegistered // <<- PPP registered

        let publicKey
        let privateKey

        if (!isRegistered || !this.isP2PProfileCompleted) { // <<- Registered in P2P validation)
          const keys = await this.generateKeys()
          publicKey = keys.publicKey
          privateKey = keys.privateKey
        } else {
          publicKey = await this.getPublicKey()
          privateKey = await this.privateKey
        }

        const mData = {
          [RootFields.NAME]: this.params.nickname,
          [RootFields.EMAIL]: 'email@email.com',
          appData: {
            privateData: {
              privateKey,
              paypal: 'https://paypal.me/' + this.params.paypalLink
            }
          }
        }

        await this.saveAccountData({
          contactMethods: [ { 'key': 'signal', 'value': '' } ],
          paymentMethods: [ { 'key': 'paypal', 'value': '' } ],
          timeZone: this.params.timeZone,
          fiatCurrency: this.params.fiatCurrency,
          publicKey
        }) // Savev public data in contract
        publicKey = null // Delete publicKey after save
        this.setIsLoading(true)
        await this.signUp(mData) // Save private key in PPP service
        privateKey = null

        this.setIsLoading(false)
        this.showSuccessMsg(this.$t('pages.account.saved'))
        this.$router.push({ path: '/dashboard' })
        delete this.params.publicKey
        delete this.params.paypalLink
        this.params = {}
        console.log(await this.getPaypal())
      } catch (error) {

      }
    },
    openPayPalLink () {
      window.open(`https://paypal.me/${this.params.paypalLink}`)
    }
  }
}
</script>

<style lang="sass" scoped>
.logoImg
  text-align: center
  padding: 20px
.btnSave
  position: sticky
  bottom: 0px
.linkBtn:hover
  color: $accent

</style>
