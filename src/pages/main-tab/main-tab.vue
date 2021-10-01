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
// import { RequestApi } from '~/services'
// import HyperionSocketClient from '@eosrio/hyperion-stream-client'

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
      try {
        this.showIsLoading(true)
        const data = {
          from: 'jmgayosso155',
          to: 'm1escrowp2px',
          quantity: '0.1000 SEEDS',
          memo: 'test esr deposit 15'
        }
        const actions = [{
          account: 'token.seeds',
          name: 'transfer',
          data,
          authorization: [
            {
              actor: 'jmgayosso155',
              permission: 'active'
              // actor: '............1',
              // permission: '............2'
            }
          ]
        }]
        this.showIsLoading(true)
        const r = await this.$store.$esrApi.signEsrTransaction({ actions })
        // const r = await window.open(esr.replace('esr://', 'https://eosio.to/'))
        // const r = await window.open(esr)
        this.showIsLoading(false)
        console.log('store', r)
        // const ENDPOINT = 'https://testnet.telos.caleos.io/'
        // const client = new HyperionSocketClient(ENDPOINT, { async: false })

        // const current = new Date().toISOString()
        // // const current = '2021-09-30T00:00:00.000Z'
        // client.onConnect = () => {
        //   client.streamActions({
        //     contract: 'token.seeds',
        //     action: 'transfer',
        //     account: '',
        //     start_from: current,
        //     read_until: 0,
        //     // filters: []
        //     filters: [
        //       {
        //         field: 'act.data.memo',
        //         value: data.memo
        //       }
        //     ]
        //   })
        // }

        // // see 3 for handling data
        // client.onData = async (data, ack) => {
        //   console.log('On Data Listened', data) // process incoming data, replace with your code
        //   ack() // ACK when done
        // }

        // client.connect(() => {
        //   console.log('connected!', current)
        // })
      } catch (e) {
        console.error('error using ESR', e)
      } finally {
        this.showIsLoading(false)
      }
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
