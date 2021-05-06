<template lang="pug">
#container.q-pa-md.custom-bg
  .row
    .col-10
        .text-h5 {{ $t('pages.mainTab.seeds') }}
    .col
        .coin
  .row.q-mt-md
    .text-h6.wallet-label {{ $t('pages.mainTab.walletBalance') }}
    .info-coin.self-center.q-ml-xs.cursor-pointer(@click="showDetailsBalance = true")
  .text-h6.wallet-value(v-if="userBalances") {{ userBalances.available_balance }}
  .row.justify-between
    .text-h6.wallet-fiat {{equivalentFiat}} USD
    q-btn.q-px-xs(
      :label="$t('pages.deposit.depositWithdraw')"
      dense
      @click="$emit('clickOnDeposit')"
      color="accent"
      size="sm"
    )
  #modals
    q-dialog(v-model="showDetailsBalance" transition-show="slide-up" transition-hide="slide-down" persistent)
      details-balance.custom-size-modal
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import DetailsBalance from './details-balance'

export default {
  name: 'card-balance',
  components: { DetailsBalance },
  data () {
    return {
      showDetailsBalance: false
    }
  },
  computed: {
    ...mapGetters('accounts', ['userBalances']),
    ...mapState('accounts', ['currentSeedsPerUsd']),
    equivalentFiat () {
      try {
        const currentSeedsAmount = this.userBalances.available_balance.replace('SEEDS', '')
        const currentSeedsValue = this.currentSeedsPerUsd.replace('SEEDS', '')
        return (currentSeedsAmount / currentSeedsValue).toFixed(4)
      } catch (e) {
        return 0
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.custom-bg
  background-image: url('./icons/BG.svg')
  background-repeat: no-repeat
  background-size: cover
  // display: inline-block
  width: 100%
  min-height: 200px
  border-radius: 25px
  max-height: 200px

.coin
  background-image: url('./icons/Coin.svg')
  background-repeat: no-repeat
  background-size: cover
  display: inline-block
  width: 50px
  height: 50px

.info-coin
  background-image: url('./icons/info.svg')
  background-repeat: no-repeat
  background-size: cover
  display: inline-block
  width: 18px
  height: 18px

.wallet-label
  font-size: 14px

.wallet-value
  font-size: 28px

.wallet-fiat
  font-size: 14px
//   width: 600px
//   height: 300px
</style>
