<template lang="pug">
#container.full-width
    q-card.q-pa-md.bg-light.q-gutter-md
        .row.justify-between
            .subtitle.text-dark {{$t('pages.balance.balance')}}
            green-flat-btn(:label="$t('pages.general.close')" v-close-popup)
        .row.justify-between
            .text-h6.text-uppercase {{$t('pages.balance.available')}}
            .subtitle.text-dark {{userBalances.available_balance}}
        .row.justify-between
            .text-h6.text-uppercase {{$t('pages.balance.swap')}}
            .subtitle.text-dark {{userBalances.swap_balance}}
        .row.justify-between
            .text-h6.text-uppercase {{$t('pages.balance.escrow')}}
            .subtitle.text-dark {{userBalances.escrow_balance}}
        q-separator
        .row.justify-between
            .text-h6.text-uppercase {{$t('pages.balance.total')}}
            .subtitle.text-dark {{totalBalance}}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'details-balance',
  computed: {
    ...mapGetters('accounts', ['userBalances']),
    totalBalance () {
      let totalBalance = 0
      totalBalance += Number.parseFloat(this.userBalances.available_balance.replace('SEEDS', ''))
      totalBalance += Number.parseFloat(this.userBalances.swap_balance.replace('SEEDS', ''))
      totalBalance += Number.parseFloat(this.userBalances.escrow_balance.replace('SEEDS', ''))
      return `${totalBalance.toFixed(4)} SEEDS`
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
