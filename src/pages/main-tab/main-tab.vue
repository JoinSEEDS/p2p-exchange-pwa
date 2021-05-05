<template lang="pug">
  #container.q-gutter-y-md
    .row.justify-center
      .col-xs-12.col-sm-10.col-md-8
        card-balance(@clickOnDeposit="showDepositForm = true")
    .row.q-mt-sm.q-col-gutter-lg
        .col(v-if="userCanSell")
          custom-sell-btn(@click="goToSellScreen")
        .col
          custom-buy-btn
    .activity-component
      recent-activity-view
    q-dialog(v-model="showDepositForm" transition-show="slide-up" transition-hide="slide-down")
      deposit-form.custom-size-modal
</template>

<script>
import CardBalance from './components/card-balance'
import CustomSellBtn from './components/custom-sell-btn'
import CustomBuyBtn from './components/custom-buy-btn'
import RecentActivityView from './components/recent-activity-view'
import { mapGetters } from 'vuex'
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
    goToSellScreen () {
      this.$router.push({ name: 'sell' })
    }
  }
}
</script>

<style lang="sass" scoped>
#container
  // background: $accent
  flex: 1
  display: flex
  flex-direction: column
.activity-component
  flex: 1
</style>
