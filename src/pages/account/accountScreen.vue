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
    ...mapActions('accounts', ['saveAccountData']),
    ...mapActions('profilesppp', ['hasActiveSession', 'signIn', 'getProfile', 'signUp']),
    ...mapMutations('general', ['setIsLoading']),
    async loadProfileData () {
      // let activeSession = await this.hasActiveSession()
      // if (!activeSession) await this.signIn()

      // this.setIsLoading(true)
      // let profile = await this.getProfile()
      // this.setIsLoading(false)
      // console.log(profile)

      if (!this.isP2PProfileCompleted) {
        this.params.nickname = this.seedsAccount.nickname
        return
      }

      // this.isP2PProfileCompleted = true

      const paypalPaymentLink = this.p2pAccount.commPref.paypalLink

      this.params = {
        nickname: this.seedsAccount.nickname,
        fiatCurrency: this.p2pAccount.commPref.fiatCurrency,
        contactMethods: undefined,
        paypalLink: paypalPaymentLink.replace('https://paypal.me/', ''),
        timeZone: this.p2pAccount.commPref.timeZone
      }
    },
    async onSubmitForm () {
      const mData = {
        [RootFields.COMM_PREF]: this.params
      }
      // console.log(mData)
      try {
        this.setIsLoading(true)
        await this.signUp(mData)
        this.setIsLoading(false)
        this.showSuccessMsg(this.$t('pages.account.saved'))
        this.$router.push('/dashboard')
      } catch (error) {

      }

      // console.log(await this.getProfile())
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
