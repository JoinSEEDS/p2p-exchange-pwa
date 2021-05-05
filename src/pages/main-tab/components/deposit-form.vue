<template lang="pug">
#container
 q-card.q-pa-sm.bg-light
    .subtitle.text-dark.q-mb-xs Deposit
    q-form.q-px-xs(@submit.prevent="onConfirmDeposit")
        q-input(
            :label="$t('pages.deposit.amount')"
            v-model="params.amount"
            outlined
            standout="text-dark"
            :rules="[rules.required]"
            type="number"
        )
        q-btn.full-width(
          :label="$t('pages.deposit.deposit')"
          color="accent"
          type="submit"
        )
</template>

<script>
import { validation } from '~/mixins/validation'
export default {
  name: 'deposit-form',
  mixins: [validation],
  data () {
    return {
      params: {
        amount: undefined
      }
    }
  },
  methods: {
    onConfirmDeposit () {
      console.log('deposit')
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
