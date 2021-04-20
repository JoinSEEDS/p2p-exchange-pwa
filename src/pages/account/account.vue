<template lang="pug">
 #container
    .row.justify-center
      img.logoImg(src="../../statics/backgrounds/simple_logo.svg")
    .row.justify-center
      .col-xs-12.col-sm-8
        .text-h5.text-white Complete your profile
        .text-weight-bold.text-white.q-mt-sm General information
        q-form.q-gutter-y-md.q-mt-sm(@submit="onSubmitForm" ref="form")
          q-input(
            label="Nickname"
            v-model="params.nickname"
            outlined
            dark
            standout="text-accent"
            :rules="[rules.required]"
          )
          q-select(
            label="Time Zone"
            v-model="params.timeZone"
            outlined
            dark
            standout="text-accent"
            color="white"
            :options="options.timeZone"
            emit-value
            map-options
            :rules="[rules.required]"
          )
          q-select(
            label="Preferred Fiat Currency"
            v-model="params.fiatCurrency"
            outlined
            dark
            standout="text-accent"
            :options="options.fiatCurrency"
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
          .text-weight-bold.text-white Enter your paypal link
          q-input(
            label="Paypal Link"
            v-model="params.paypalEmail"
            outlined
            dark
            standout="text-accent"
            :rules="[rules.required]"
            prefix="https://paypal.me/"
            hint="Press TAB to autocomplete suggested value or ESC to cancel suggestion"
          )
              template(v-slot:append)
                q-icon.animated-icon.cursor-pointer.linkBtn(
                  name="open_in_new" @click="openPayPalLink"
                  v-show="params.paypalEmail"
                )
                  q-tooltip Open to confirm you write your profile link correctly
          .row.bg-primary.btnSave.q-py-sm
            q-btn.full-width(
              label="Save"
              color="accent"
              type="submit"
            )
</template>

<script>
import { validation } from '~/mixins/validation'
import { mapActions } from 'vuex'

export default {
  name: 'account',
  mixins: [validation],
  data () {
    return {
      params: {
        nickname: undefined,
        fiatCurrency: undefined,
        contactMethods: undefined,
        paypalEmail: undefined,
        timeZone: undefined
      },
      options: {
        timeZone: [
          {
            label: 'MX',
            value: 'mx-timezone'
          },
          {
            label: 'US',
            value: 'us-timezone'
          }
        ],
        fiatCurrency: [
          {
            label: 'USD',
            value: 'usd'
          },
          {
            label: 'MXN',
            value: 'mxn'
          }
        ],
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
  methods: {
    ...mapActions('accounts', ['saveAccountData']),
    async onSubmitForm () {
      console.log('onSubmitted', this.params)
      try {
        await this.saveAccountData({
          contactMethods: [ { 'key': 'signal', 'value': 'testValue' } ],
          paymentMethods: [ { 'key': 'paypal', 'value': `https://paypal.me/${this.params.paypalEmail}` } ],
          timeZone: this.params.timeZone,
          fiatCurrency: this.params.fiatCurrency
        })
        console.log('Account info was saved')
      } catch (e) {

      }
    },
    openPayPalLink () {
      window.open(`https://paypal.me/${this.params.paypalEmail}`)
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
