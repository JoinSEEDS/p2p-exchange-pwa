<template lang="pug">
  #container.q-gutter-y-md
    .row.justify-center
      .col-xs-12.col-sm-10.col-md-8
        card-balance
    .activity-component
      recent-activity-view(@clickOnDeposit="showDepositForm = true")
    q-dialog(v-model="showDepositForm" transition-show="slide-up" transition-hide="slide-down" persistent)
      deposit-form.custom-size-modal(@onSuccess="onSuccessUpdateForm")
</template>

<script>
import CardBalance from './components/card-balance'
import CustomSellBtn from './components/custom-sell-btn'
import CustomBuyBtn from './components/custom-buy-btn'
import RecentActivityView from './components/recent-activity-view'
import { mapGetters, mapActions } from 'vuex'
import DepositForm from '~/pages/main-tab/components/deposit-form'

export default {
  name: 'main-tab',
  components: { CardBalance, CustomSellBtn, CustomBuyBtn, RecentActivityView, DepositForm },
  data () {
    return {
      showDepositForm: false
    }
  },
  computed: {
    ...mapGetters('accounts', ['userCanSell'])
  },
  methods: {
    ...mapActions('accounts', ['getBalances']),
    goToSellScreen () {
      this.$router.push({ name: 'sell' })
    },
    goToBuyScreen () {
      this.$router.push({ name: 'sellOffers' })
    },
    onSuccessUpdateForm () {
      this.getBalances()
      this.showDepositForm = false
    }
  }
}
</script>

<style lang="sass" scoped>
#container
  flex: 1
  display: flex
  flex-direction: column
.activity-component
  flex: 1
</style>
