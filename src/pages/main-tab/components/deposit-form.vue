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
import { mapActions } from 'vuex'

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
    ...mapActions('accounts', ['deposit']),
    async onConfirmDeposit () {
      try {
        const response = await this.deposit({
          quantity: `${this.params.amount} SEEDS`,
          memo: `Deposit for ${this.params.amount} SEEDS`
        })
        console.log('response deposit', response)
      } catch (e) {

      }
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
