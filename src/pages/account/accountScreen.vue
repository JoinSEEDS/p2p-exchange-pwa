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
    ...mapActions('profiles', ['signUp', 'signIn']),
    ...mapActions('encryption', ['generateKeys', 'addPublicKey']),
    ...mapMutations('general', ['setIsLoading']),
    async loadProfileData () {
      if (!this.isP2PProfileCompleted) {
        this.params.nickname = this.seedsAccount.nickname
        if (!(await this.isLoggedIn)) { await this.signIn() }
        return
      }

      if (!(await this.isLoggedIn)) { await this.signIn() }

      // let loggedIn = await this.isLoggedIn
      // console.log('L<ogged in', !(await this.isLoggedIn))
      // if (!(await this.isLoggedIn)) { await this.signIn() }
      // await this.signIn()

      // if (await !this.isLoggedIn) { console.log('not logged in', loggedIn) }

      // if ()

      // console.log(this.p2pAccount)

      // const paypalPaymentLink = this.p2pAccount.commPref.paypalLink
      // console.log('p2pacc', this.p2pAccount)
      this.params = {
        nickname: this.seedsAccount.nickname,
        fiatCurrency: this.p2pAccount.fiat_currency,
        contactMethods: undefined,
        paypalLink: await this.paypal || '',
        timeZone: this.p2pAccount.time_zone
      }
    },
    async onSubmitForm () {
      try {
        this.setIsLoading(true)

        // Genereate keys
        let publicKey
        let privateKey

        if (!this.isP2PProfileCompleted) {
          const keys = await this.generateKeys()
          publicKey = keys.publicKey
          privateKey = keys.privateKey
        } else {
          publicKey = await this.getPublicKey()
          privateKey = await this.privateKey
        }

        // console.log('private', privateKey, 'public', publicKey)

        // Setting private key to data OBJ
        // if (privateKey) this.params.privateKey = privateKey
        // if (pu) this.params.privateKey = privateKey

        const mData = {
          [RootFields.NAME]: this.params.nickname,
          appData: {
            privateData: {
              privateKey,
              paypal: this.params.paypalLink
            }
          }
        }

        await this.saveAccountData({
          contactMethods: [ { 'key': 'signal', 'value': '' } ],
          paymentMethods: [ { 'key': 'paypal', 'value': '' } ],
          timeZone: this.params.timeZone,
          fiatCurrency: this.params.fiatCurrency,
          publicKey
        })
        publicKey = null // Delete publicKey after save

        await this.signUp(mData) // Save private key in PPP service
        privateKey = null
        await this.setIsLoading(false)
        await this.showSuccessMsg(this.$t('pages.account.saved'))
        await this.$router.push({ path: '/dashboard' })
        this.params = undefined
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
