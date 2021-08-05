<template lang="pug">
#container.q-pa-md.custom-bg
  .row
    .col-10.q-pa-sm
        .text-h5 {{ $t('pages.mainTab.seeds') }}
    .col
        .coin
  .row.q-mt-lg
    .text-h6.wallet-label {{ $t('pages.mainTab.walletBalance') }}
    .info-coin.self-center.q-ml-xs.cursor-pointer(v-if="userBalances" @click="showDetailsBalance = true")
      q-tooltip {{$t('pages.balance.seeBalancesDetails')}}
  .text-h6.wallet-value(v-if="userBalances") {{ userBalances.available_balance.split(' ')[0] }}
  .row
    .text-h6.wallet-fiat {{equivalentFiat}}
  #modals
    q-dialog(v-model="showDetailsBalance" transition-show="slide-up" transition-hide="slide-down" persistent)
      details-balance.custom-round
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import DetailsBalance from './details-balance'

export default {
  name: 'card-balance',
  components: { DetailsBalance },
  data () {
    return {
      showDetailsBalance: false
    }
  },
  amount () {
    this.getBalances()
  },
  computed: {
    ...mapGetters('accounts', ['userBalances', 'userCanMoveBalance']),
    ...mapState('accounts', ['currentSeedsPerUsd']),
    equivalentFiat () {
      try {
        return this.userBalances ? this.parseSeedsToCurrentFiatWithSymbol(this.userBalances.available_balance.replace('SEEDS', '')) : 0
      } catch (e) {
        console.error(e)
        return 0
      }
    }
  },
  methods: {
    ...mapActions('accounts', ['getBalances'])
  }
}
</script>

<style lang="sass" scoped>
.custom-bg
  background-image: url('./icons/BG.svg')
  background-color: $accent
  background-repeat: no-repeat
  background-size: cover
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
  font-size: 12px

.wallet-value
  font-size: 20px

.wallet-fiat
  font-size: 12px
</style>
