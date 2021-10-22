<template lang="pug">
div
  .row.q-col-gutter-xs
    .col
      q-select(
        label="Payment Method"
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
    .col
      q-select(
        label="Details"
        v-model="paymentMethods.selectedType"
        :options="detailOptions"
        outlined
        dark
        standout="text-accent"
        emit-value
        map-options
        color="white"
      )
  #contactMethods(v-if="paymentMethods.selectedPaymentMethod")
    #paypal(v-if="paymentMethods.selectedPaymentMethod === 'paypal' && paymentMethods.selectedType === 'link'")
      .text-weight-bold.text-white  {{$t('pages.account.enterPaypalLink')}}
      q-input(
        :label="inputLabel"
        v-model="paymentMethods.paymentValue"
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
      v-else-if="paymentMethods.selectedType === 'email'"
      :label="inputLabel"
      v-model.trim="paymentMethods.paymentValue"
      outlined
      dark
      standout="text-accent"
      :rules="[rules.required, rules.email]"
      autocomplete="off"
    )
    q-input(
      v-else-if="paymentMethods.selectedType === 'cellphone'"
      :label="inputLabel"
      v-model.trim="paymentMethods.paymentValue"
      outlined
      dark
      standout="text-accent"
      :rules="[rules.required, rules.internationalNumber]"
      autocomplete="off"
    )
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
      type: 'email',
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
        ],
        types: [
          {
            label: 'Email',
            value: 'email'
          },
          {
            label: 'Cellphone',
            value: 'cellphone'
          },
          {
            label: 'Link',
            value: 'link'
          },
          {
            label: 'Account Name',
            value: 'accountname'
          }
        ]
      }
    }
  },
  methods: {
    openPayPalLink () {
      window.open(`${this.paypalBase}${this.paymentMethods.paypal}`)
    }
  },
  watch: {
    'paymentMethods.selectedPaymentMethod' () {
      // console.log('selectedPaymentMethod', v)
      this.paymentMethods.selectedType = this.detailOptions[0].value
    },
    'paymentMethods.selectedType' () {
      // console.log('selectedPaymentMethod', v)
      this.paymentMethods.paymentValue = undefined
    }
  },
  computed: {
    detailOptions () {
      if (this.paymentMethods.selectedPaymentMethod === 'paypal') {
        return [
          {
            label: 'Link',
            value: 'link'
          },
          {
            label: 'Email',
            value: 'email'
          }
        ]
      } else if (this.paymentMethods.selectedPaymentMethod === 'transferwise') {
        return [
          {
            label: 'Email',
            value: 'email'
          },
          {
            label: 'Cellphone',
            value: 'cellphone'
          },
          // {
          //   label: 'Link',
          //   value: 'link'
          // },
          {
            label: 'Account',
            value: 'accountname'
          }
        ]
      } else if (this.paymentMethods.selectedPaymentMethod === 'cashapp') {
        return [
          {
            label: 'Cashtag',
            value: 'cashtag'
          },
          {
            label: 'Email',
            value: 'email'
          },
          {
            label: 'Cellphone',
            value: 'cellphone'
          }
        ]
      } else if (this.paymentMethods.selectedPaymentMethod === 'venmo') {
        return [
          {
            label: 'Routing #',
            value: 'routing'
          },
          {
            label: 'Cellphone',
            value: 'cellphone'
          }
        ]
      } else if (this.paymentMethods.selectedPaymentMethod === 'gojek') {
        return [
          {
            label: 'Cellphone',
            value: 'cellphone'
          }
        ]
      } else {
        return [
          {
            label: 'Email',
            value: 'email'
          },
          {
            label: 'Cellphone',
            value: 'cellphone'
          },
          {
            label: 'Link',
            value: 'link'
          },
          {
            label: 'Account',
            value: 'accountname'
          }
        ]
      }
    },
    inputLabel () {
      const label = `${this.paymentMethods.selectedType} (${this.paymentMethods.selectedPaymentMethod})`
      return label.toUpperCase()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
