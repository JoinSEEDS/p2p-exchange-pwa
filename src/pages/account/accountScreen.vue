<template lang="pug">
 #container
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
import { mapActions, mapState } from 'vuex'
import { CommonCurrencies, CommonTimeZone } from '~/const'

export default {
  name: 'account',
  mixins: [validation],
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
    loadProfileData () {
      const paypalPaymentLink = this.p2pAccount.payment_methods.find(v => v.key === 'paypal')

      this.params = {
        nickname: this.seedsAccount.nickname,
        fiatCurrency: this.p2pAccount.fiat_currency,
        contactMethods: undefined,
        paypalLink: paypalPaymentLink.value.replace('https://paypal.me/', ''),
        timeZone: this.p2pAccount.time_zone
      }
    },
    async onSubmitForm () {
      console.log('onSubmitted', this.params)
      try {
        await this.saveAccountData({
          contactMethods: [ { 'key': 'signal', 'value': 'testValue' } ],
          paymentMethods: [ { 'key': 'paypal', 'value': `https://paypal.me/${this.params.paypalLink}` } ],
          timeZone: this.params.timeZone,
          fiatCurrency: this.params.fiatCurrency
        })
        console.log('Account info was saved')
      } catch (e) {

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
