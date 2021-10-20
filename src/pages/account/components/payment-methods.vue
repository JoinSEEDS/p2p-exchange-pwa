<template lang="pug">
div
  q-select(
    label="Preferred Payment Method"
    v-model.trim="paymentMethods.selectedPaymentMethod"
    outlined
    dark
    standout="text-accent"
    :options="options.paymentMethods"
    emit-value
    map-options
    color="white"
    :rules="[rules.required]"
  )
  #contactMethods(v-if="paymentMethods.selectedPaymentMethod")
    #paypal(v-if="paymentMethods.selectedPaymentMethod === 'paypal'")
      .text-weight-bold.text-white  {{$t('pages.account.enterPaypalLink')}}
      q-input(
        :label="$t('pages.account.paypalLink')"
        v-model="paymentMethods.paypal"
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
            v-show="paymentMethods.paypal"
          )
            q-tooltip {{ $t('pages.account.hintPaypal') }}
    q-input(
      v-else-if="paymentMethods.selectedPaymentMethod === 'transferwise'"
      :label="$t('pages.account.transferwise')"
      v-model.trim="paymentMethods.transferwise"
      outlined
      dark
      standout="text-accent"
      :rules="[rules.required]"
      mask="#### #### #### ####"
      autocomplete="off"
    )
    q-input(
      v-else-if="paymentMethods.selectedPaymentMethod === 'cashapp'"
      :label="$t('pages.account.cashtag')"
      v-model="paymentMethods.cashapp"
      outlined
      dark
      prefix="$"
      standout="text-accent"
      :rules="[rules.required]"
      autocomplete="off"
    )
    q-input(
      v-else-if="paymentMethods.selectedPaymentMethod === 'venmo'"
      :label="$t('pages.account.venmo')"
      v-model="paymentMethods.venmo"
      outlined
      dark
      standout="text-accent"
      :rules="[rules.required]"
      autocomplete="off"
    )
    q-input(
      v-else-if="paymentMethods.selectedPaymentMethod === 'gojek'"
      :label="$t('pages.account.gojek')"
      v-model="paymentMethods.gojek"
      outlined
      dark
      standout="text-accent"
      :rules="[rules.required, rules.internationalNumber]"
      autocomplete="off"
    )
</template>

<script>
import { validation } from '~/mixins/validation'

export default {
  name: 'payment-methods',
  mixins: [validation],
  props: {
    paymentMethods: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      paypalBase: 'https://paypal.me/',
      options: {
        paymentMethods: [
          {
            label: 'Paypal',
            value: 'paypal'
          },
          {
            label: 'Transferwise',
            value: 'transferwise'
          },
          {
            label: 'CashApp',
            value: 'cashapp'
          },
          {
            label: 'Venmo',
            value: 'venmo'
          },
          {
            label: 'Gojek',
            value: 'gojek'
          }
        ]
      }
    }
  },
  methods: {
    openPayPalLink () {
      window.open(`${this.paypalBase}${this.paymentMethods.paypal}`)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
