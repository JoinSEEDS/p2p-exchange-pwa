<template lang="pug">
  #containerIncomingOffers(v-if="offer")
    q-icon.cursor-pointer(name="keyboard_backspace" color="white" size="md" @click="$router.replace({ name: 'dashboard', params: { tab: 'transactions' } })")
    .subtitle.text-white.q-mt-sm {{ $t('pages.incoming_offers.incoming_offers') }}
    //- .row.full-width
    #offerData
      .col.text-center.q-my-md
        .text-white.text-h5 {{ offered }}
        hr.custom-size.q-my-sm
        .text-white.text-h5 ${{ equivalentFiat }}
      .col
        .text-white Percentage: {{ priceper }}%
        .text-white Sold: {{ sold }}
          q-icon(name="arrow_upward" color="red").q-ml-sm
    q-separator(color="warning").q-my-sm
    .subtitle.text-white.q-my-sm {{ $t('pages.incoming_offers.proposals') }}
    #containerScroll
      #items(v-for="(offer, index) in incomingOffers")
        incoming-offer-item(:offer="offer")
        q-separator.full-width.q-my-sm(color="warning" v-if="index+1 != incomingOffers.length")

</template>

<script>
import { OfferStatus } from '../../const/OfferStatus'
import { mapActions } from 'vuex'
import incomingOfferItem from './components/incoming-offer-item.vue'
import { EventBus } from '~/event-bus'

export default {
  name: 'incoming-buy-offers',
  components: { incomingOfferItem },
  computed: {
    status () {
      return ''
    },
    offerId () {
      return this.$route.params.id
    },
    available () {
      return this.offer.quantity_info.find(el => el.key === 'available').value
    },
    offered () {
      return this.offer.quantity_info.find(el => el.key === 'totaloffered').value
    },
    priceper () {
      return this.offer.price_info.find(el => el.key === 'priceper').value
    },
    sold () {
      return `${(this.amountOf(this.offered) - this.amountOf(this.available)).toFixed(4)} SEEDS`
    },
    equivalentFiat () {
      try {
        return this.parseSeedsToCurrentFiatWithSymbol(this.offered.split(' ')[0])
      } catch (e) {
        console.error(e)
        return 0
      }
    }
  },
  data () {
    return {
      OfferStatus,
      offer: undefined,
      incomingOffers: []
    }
  },
  mounted () {
    this.getOfferInfo()
    this.getIncommingBuyOffers()
    EventBus.$on('confirmOffer', async () => {
      this.showOptions = false
      this.getIncommingBuyOffers()
    })
  },
  beforeDestroy () {
    EventBus.$off('confirmOffer')
  },
  methods: {
    ...mapActions('buySellRels', ['getBuyOffersBySellOffer']),
    ...mapActions('sellOffers', ['getSellOfferById', 'getBuyOffersBySaleOffer']),
    async getOfferInfo () {
      try {
        this.offer = await this.getSellOfferById(this.offerId)
      } catch (error) {
        console.log(error)
      }
    },
    async getIncommingBuyOffers () {
      let { rows } = await this.getBuyOffersBySaleOffer({ id: this.offerId })
      this.incomingOffers = rows.filter(el => (el.type === OfferStatus.BUY_OFFER && el.sell_id === parseInt(this.offerId)))
    },
    amountOf (asset) {
      return parseFloat(asset.split(' ')[0])
    }
  }
}
</script>

<style lang="sass">
  #containerIncomingOffers
    display: flex
    flex-direction: column
    padding: 10% 5%
  #containerScroll
    overflow: auto
    flex: 1
    max-height: 50vh
  .custom-size
    color: $warning
    width: 60%
  .custom-font
    font-family: 'SF Pro Display'
</style>
