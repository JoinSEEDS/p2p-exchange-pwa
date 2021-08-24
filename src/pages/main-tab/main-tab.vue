<template lang="pug">
  #container.q-gutter-y-md
    .row.justify-center
      .col-xs-12.col-sm-10.col-md-8
        card-balance
    .activity-component
      recent-activity-view(@clickOnDeposit="showDialog")
    q-dialog(v-model="showDepositForm" transition-show="slide-up" transition-hide="slide-down" persistent)
      deposit-form.custom-size-modal(@onSuccess="onSuccessUpdateForm")
    q-dialog(v-model="showNotPermissions" transition-show="slide-up" transition-hide="slide-down" persistent)
      not-permissions(@onClose="showNotPermissions = false")
</template>

<script>
import CardBalance from './components/card-balance'
import CustomSellBtn from './components/custom-sell-btn'
import CustomBuyBtn from './components/custom-buy-btn'
import RecentActivityView from './components/recent-activity-view'
import { mapGetters, mapActions } from 'vuex'
import DepositForm from '~/pages/main-tab/components/deposit-form'
import NotPermissions from '~/pages/main-tab/components/not-permissions'

export default {
  name: 'main-tab',
  components: { CardBalance, CustomSellBtn, CustomBuyBtn, RecentActivityView, DepositForm, NotPermissions },
  data () {
    return {
      showDepositForm: false,
      showNotPermissions: false
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
    },
    showDialog () {
      this.userCanSell ? this.showDepositForm = true : this.showNotPermissions = true
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
