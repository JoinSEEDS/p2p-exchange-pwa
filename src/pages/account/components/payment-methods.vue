<template lang="pug">
div
  q-select(
    label="Preferred Contact Method"
    v-model="paramsPayment.selectedPaymentMethod"
    outlined
    dark
    standout="text-accent"
    :options="options.paymentMethods"
    emit-value
    map-options
    color="white"
    :rules="[rules.required]"
  )
  #contactMethods(v-if="paramsPayment.selectedPaymentMethod")
    #paypal(v-if="paramsPayment.selectedPaymentMethod === 'paypal'")
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
      v-else-if="paramsPayment.selectedPaymentMethod === 'option-1'"
      label="Option 1"
      v-model="paymentMethods.pm1"
      outlined
      dark
      standout="text-accent"
      :rules="[rules.required]"
      autocomplete="off"
    )
    q-input(
      v-else-if="paramsPayment.selectedPaymentMethod === 'option-2'"
      label="Option 2"
      v-model="paymentMethods.pm2"
      outlined
      dark
      standout="text-accent"
      :rules="[rules.required]"
      autocomplete="off"
    )
    q-input(
      v-else-if="paramsPayment.selectedPaymentMethod === 'option-3'"
      label="Option 3"
      v-model="paymentMethods.pm3"
      outlined
      dark
      standout="text-accent"
      :rules="[rules.required]"
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
    },
    paramsPayment: {
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
            label: 'Option-1',
            value: 'option-1'
          },
          {
            label: 'Option-2',
            value: 'option-2'
          },
          {
            label: 'Option-3',
            value: 'option-3'
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
