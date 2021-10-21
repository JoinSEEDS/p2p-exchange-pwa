<template lang="pug">
#container
 q-card.q-pa-md.bg-light.custom-round
    .row.justify-between
        .subtitle.text-dark.q-mb-xs {{$t('pages.deposit.depositWithdraw')}}
        green-flat-btn(:label="$t('pages.general.close')" v-close-popup)
    q-form.q-px-xs(@submit.prevent="onSubmitForm")
        .text-normal.text-dark {{$t('pages.deposit.selectTypeAction')}}
        .row
            q-radio(v-model="params.typeTransaction" val="deposit" :label="$t('pages.deposit.deposit')" color="dark")
        .row
            q-radio(v-model="params.typeTransaction" val="withdraw" :label="$t('pages.deposit.withdraw')" color="dark")
        q-input(
            :label="$t('pages.deposit.amount')"
            v-model="params.amount"
            outlined
            standout="text-dark"
            :rules="[rules.required]"
            type="number"
            min="0"
            step="0.000001"
        )
        q-btn.full-width(
          :label="params.typeTransaction"
          color="accent"
          type="submit"
        ).custom-round
</template>

<script>
import { validation } from '~/mixins/validation'
import { mapActions } from 'vuex'
import { v4 as uuid } from 'uuid'

export default {
  name: 'deposit-form',
  mixins: [validation],
  data () {
    return {
      params: {
        amount: undefined,
        typeTransaction: 'deposit'
      }
    }
  },
  methods: {
    ...mapActions('accounts', ['deposit', 'withdraw']),
    async onSubmitForm () {
      try {
        const quantity = `${Number.parseFloat(this.params.amount).toFixed(4)} SEEDS`
        if (this.params.typeTransaction === 'deposit') {
          await this.deposit({
            quantity,
            memo: `Deposit for ${quantity} - ${uuid()}`
          })
          this.$q.notify({
            type: 'positive',
            message: this.$t('pages.deposit.successDeposit', { amount: quantity })
          })
          this.$emit('onSuccess')
        } else if (this.params.typeTransaction === 'withdraw') {
          await this.withdraw({
            quantity,
            memo: `withdraw for ${quantity} - ${uuid()}`
          })
          this.$q.notify({
            type: 'positive',
            message: this.$t('pages.deposit.successWithdraw', { amount: quantity })
          })
          this.$emit('onSuccess')
        }
      } catch (e) {

      }
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
