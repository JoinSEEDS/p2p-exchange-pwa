<template lang="pug">
 #container
  .q-pa-md
    q-icon.cursor-pointer(v-if="isP2PProfileCompleted" name="keyboard_backspace" color="white" size="md" @click="$router.replace({ name: isArbiter ? 'arbitration' : 'dashboard' })")
    .row.justify-center
      img.logoImg(src="../../statics/backgrounds/simple_logo.svg")
    .row.justify-center
      .col-xs-12.col-sm-8
        //- .text-h5.text-white {{$t('pages.account.nickname')}}
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
          q-select(
            label="Preferred Contact Method"
            v-model="params.selectedContactMethod"
            outlined
            dark
            standout="text-accent"
            :options="options.contactMethods"
            emit-value
            map-options
            color="white"
            :rules="[rules.required]"
          )
          #contactMethods(v-if="params.selectedContactMethod")
            q-input(
              v-if="params.selectedContactMethod === 'signal'"
              :label="$t('pages.account.signal')"
              v-model="params.contactMethods.signal"
              outlined
              dark
              standout="text-accent"
              :rules="[rules.required, rules.internationalNumber]"
              autocomplete="off"
            )
            q-input(
              v-else-if="params.selectedContactMethod === 'email'"
              :label="$t('pages.account.email')"
              v-model="params.contactMethods.email"
              outlined
              dark
              standout="text-accent"
              :rules="[rules.required, rules.email]"
              autocomplete="off"
            )
          q-separator.full-width(dark)
          payment-methods(:paymentMethods.sync="params.paymentMethods")
          //-
            q-separator.full-width(dark)
            .text-weight-bold.text-white  {{$t('pages.account.enterPaypalLink')}}
            q-input(
              :label="$t('pages.account.paypalLink')"
              v-model="params.paypalLink"
              outlined
              dark
              standout="text-accent"
              :rules="[rules.required]"
              :prefix="paypalBase"
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
            ).custom-round
</template>

<script>
import { validation } from '~/mixins/validation'
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import { CommonCurrencies, CommonTimeZone } from '~/const'
import { RootFields } from '@smontero/ppp-common'
import { utils } from '~/mixins/utils'
import PaymentMethods from './components/payment-methods.vue'

export default {
  name: 'account',
  mixins: [validation, utils],
  components: { PaymentMethods },
  data () {
    return {
      paypalBase: 'https://paypal.me/',
      params: {
        nickname: undefined,
        fiatCurrency: undefined,
        selectedContactMethod: undefined,
        contactMethods: {
          signal: undefined,
          email: undefined
        },
        // selectedPaymentMethod: undefined,
        paymentMethods: {
          selectedPaymentMethod: undefined,
          selectedType: undefined,
          paymentMethodValue: undefined
          // paypal: undefined,
          // transferwise: undefined,
          // cashapp: undefined,
          // venmo: undefined,
          // gojek: undefined
        },
        paypalLink: undefined,
        timeZone: undefined
      },
      options: {
        contactMethods: [
          {
            label: 'Signal Number',
            value: 'signal'
          },
          {
            label: 'Email',
            value: 'email'
          }
        ]
      }
    }
  },
  mounted () {
    this.loadProfileData()
  },
  computed: {
    ...mapState('accounts', ['p2pAccount', 'seedsAccount']),
    ...mapGetters('accounts', ['isP2PProfileCompleted', 'isValidKeyPair']),
    ...mapGetters('profiles', ['isLoggedIn']),
    ...mapGetters('accounts', ['isArbiter']),
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
    ...mapActions('accounts', ['saveAccountData', 'getPublicKey', 'getAccountInfo']),
    ...mapActions('profiles', ['signUp', 'signIn', 'isRegistered', 'getPrivateKey', 'getProfile']),
    ...mapActions('encryption', ['generateKeys', 'addPublicKey']),
    ...mapMutations('general', ['setIsLoading']),
    async loadProfileData () {
      this.setIsLoading(true)
      let isRegistered = await this.isRegistered() // <<- PPP registered

      if (!this.isP2PProfileCompleted) { // <<- Registered in P2P validation
        this.params.nickname = this.seedsAccount.nickname
        this.setIsLoading(false)
        return
      }

      let PPPprofile = await this.getProfile()
      console.log('PPPprofile', PPPprofile)

      // let paypal = (isRegistered) ? await this.getPaypal() : ''
      this.params = {
        ...this.params,
        nickname: this.seedsAccount.nickname,
        fiatCurrency: this.p2pAccount.fiat_currency,
        selectedContactMethod: undefined,
        timeZone: this.p2pAccount.time_zone
      }

      if (isRegistered && PPPprofile.appData.privateData && PPPprofile.appData.privateData.prefContactMeth) {
        this.params = {
          ...this.params,
          selectedContactMethod: PPPprofile.appData.privateData.prefContactMeth,
          contactMethods: {
            [PPPprofile.appData.privateData.prefContactMeth]: PPPprofile.appData.privateData.prefContactMethValue
          }
        }
      }

      if (isRegistered && PPPprofile.appData.privateData && PPPprofile.appData.privateData.prefPaymentMeth) {
        this.params = {
          ...this.params,
          // paypalLink: PPPprofile.appData.privateData.paypal.replace(this.paypalBase, ''),
          paymentMethods: {
            selectedPaymentMethod: PPPprofile.appData.privateData.prefPaymentMeth,
            selectedType: PPPprofile.appData.privateData.prefPaymentMethType,
            paymentMethodValue: PPPprofile.appData.privateData.prefPaymentMethValue
          }
        }
        console.log('Loading payment method', this.params)
      }

      // paypal = undefined
      PPPprofile = undefined
      this.setIsLoading(false)
    },
    async onSubmitForm () {
      console.log(this.params.selectedPaymentMethod, 'Selected Payment Method')
      console.log(this.params.paymentMethods, 'Payment Method')
      try {
        this.setIsLoading(true)
        let isRegistered = await this.isRegistered() // <<- PPP registered

        let publicKey
        let privateKey

        if (!isRegistered || !this.isP2PProfileCompleted || !this.isValidKeyPair) { // <<- Registered in P2P validation)
          const keys = await this.generateKeys()
          publicKey = keys.publicKey
          privateKey = keys.privateKey
        } else {
          publicKey = await this.getPublicKey()
          privateKey = await this.getPrivateKey()
        }
        this.setIsLoading(true)
        let prefContactMethValue
        if (this.params.selectedContactMethod === 'signal') {
          prefContactMethValue = this.params.contactMethods.signal
        } else if (this.params.selectedContactMethod === 'email') {
          prefContactMethValue = this.params.contactMethods.email
        }

        const mData = {
          [RootFields.NAME]: this.params.nickname,
          [RootFields.EMAIL]: 'email@email.com',
          appData: {
            privateData: {
              privateKey,
              // paypal: this.paypalBase + this.params.paypalLink,
              prefContactMeth: this.params.selectedContactMethod,
              prefContactMethValue,
              prefPaymentMeth: this.params.paymentMethods.selectedPaymentMethod,
              prefPaymentMethValue: this.params.paymentMethods.paymentMethodValue,
              prefPaymentMethType: this.params.paymentMethods.selectedType
            }
          }
        }
        await this.saveAccountData({
          contactMethods: [ { 'key': 'signal', 'value': '' } ],
          paymentMethods: [ { 'key': 'paypal', 'value': '' } ],
          timeZone: this.params.timeZone,
          fiatCurrency: this.params.fiatCurrency,
          publicKey: !this.isValidKeyPair ? publicKey : undefined
        }) // Savev public data in contract
        console.log('after save Account')
        this.setIsLoading(true)
        publicKey = null // Delete publicKey after save
        console.log('before signUp')
        await this.signUp(mData) // Save private key in PPP service
        this.setIsLoading(true)
        this.$store.commit('accounts/setValidKeyPair', true)
        console.log('after signUp')
        this.setIsLoading(true)
        privateKey = null
        await this.getAccountInfo()
        this.setIsLoading(true)
        this.showSuccessMsg(this.$t('pages.account.saved'))
        if (this.isArbiter) {
          this.$router.push({ path: '/arbitration' })
        } else {
          this.$router.push({ path: '/dashboard' })
        }
      } catch (error) {
        this.setIsLoading(false)
      } finally {
        this.setIsLoading(false)
      }
    },
    openPayPalLink () {
      window.open(`${this.paypalBase}${this.params.paypalLink}`)
    }
  }
}
</script>

<style lang="sass" scoped>
.logoImg
  text-align: center
  padding: 20px
  width: 100px
  height: 100px
.btnSave
  position: sticky
  bottom: 0px
.linkBtn:hover
  color: $accent
</style>
