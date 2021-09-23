<template lang="pug">
  //- q-scroll-area
  #container.q-gutter-y-md(ref="container")
    .row.justify-center
      .col-xs-12.col-sm-10.col-md-8
        card-balance
    .activity-component
      recent-activity-view(@clickOnDeposit="showDialog" @clickOnTest="testLightWallet")
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
import { RequestApi } from '~/services'

export default {
  name: 'main-tab',
  components: { CardBalance, CustomSellBtn, CustomBuyBtn, RecentActivityView, DepositForm, NotPermissions },
  data () {
    return {
      showDepositForm: false,
      showNotPermissions: false
    }
  },
  async mounted () {
    // this.$refs.container.scrollTo(0)
    setTimeout(() => {
      window.scrollTo(255, 255)
    }, 500)
    window.scrollTo(255, 255)
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
    },
    async testLightWallet () {
      // curl --location --request POST 'https://api-esr.hypha.earth/qr' \
      const requestApi = new RequestApi('https://api-esr.hypha.earth')
      const response = await requestApi.post({
        resource: '/qr',
        data: {
          actions: [{
            account: 'token.seeds',
            name: 'payoffer',
            data: {
              buy_offer_id: 3
            }
          }]
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log('testing light wallet', response)
    }
  }
}
</script>

<style lang="sass" scoped>
#container
  flex: 1
  display: flex
  flex-direction: column
  // overflow: auto
.activity-component
  // overflow: auto
  flex: 0.8
</style>
