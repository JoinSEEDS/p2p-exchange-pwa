<template lang="pug">
  #containerIncomingOffers(v-if="offer")
    q-icon.cursor-pointer(name="keyboard_backspace" color="white" size="md" @click="$router.replace({ name: 'dashboard', params: { tab: 'transactions', subTab: 'sale' } })")
    .subtitle.text-white.q-mt-sm {{ $t('pages.incoming_offers.incoming_offers') }}
    #offerData
      .col.text-center.q-my-md
        .text-white.text-h5 {{ offered }}
        hr.custom-size.q-my-sm
        .text-white.text-h5 ${{ equivalentFiat }}
      .col
        .text-green {{ $t('pages.incoming_offers.percentage') }}:
          span.text-white  {{ priceper }}%
        .text-green {{ $t('pages.incoming_offers.sold') }}:
          span.text-white  {{ sold }}
          q-icon(name="arrow_upward" color="red").q-ml-sm
    q-separator(color="warning").q-my-sm
    .subtitle.text-white.q-my-sm {{ $t('pages.incoming_offers.proposals') }}
    #containerList
      #noData(v-if="incomingOffers.rows.length === 0").text-center
        .text-h6.text-white.custom-font {{ $t('pages.incoming_offers.no_offers') }}
        .text-white.custom-font {{ $t('pages.incoming_offers.not_yet') }}
      q-pull-to-refresh(@refresh="refresh")
        #offersEmpty(v-if="incomingOffers.length === 0 && loading")
          skeleton-offer-item
        q-infinite-scroll.infiniteScroll(@load="onLoad" :offset="scrollOffset" :scroll-target="$refs.scrollTarget" ref="customInfinite")
          #containerScroll(ref="scrollTarget")
            #items(v-for="(offer, index) in incomingOffers.rows")
              incoming-offer-item(:offer="offer")
              q-separator.full-width.q-my-sm(color="warning" v-if="index + 1 != incomingOffers.length")
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
      // incomingOffers: [],
      loading: true,
      limit: 4,
      scrollOffset: 1000,
      incomingOffers: {
        rows: [],
        nextKey: undefined,
        more: true
      }
    }
  },
  mounted () {
    this.getOfferInfo()
    // this.getIncommingBuyOffers()
    EventBus.$on('confirmOffer', async () => {
      this.showOptions = false
      this.resetPagination()
      // this.getIncommingBuyOffers()
    })
  },
  beforeDestroy () {
    EventBus.$off('confirmOffer')
  },
  methods: {
    ...mapActions('buySellRels', ['getBuyOffersBySellOffer']),
    ...mapActions('sellOffers', ['getSellOfferById', 'getBuyOffersBySaleOffer']),
    async refresh (done) {
      this.resetPagination()
      done()
    },
    async onLoad (index, done) {
      this.loading = true
      if (this.incomingOffers.more) {
        const { rows, more, next_key: nextKey } = await this.getBuyOffersBySaleOffer({
          id: this.offerId,
          limit: this.limit,
          nextKey: this.incomingOffers.nextKey
        })
        if (rows) {
          let rws = rows.filter(el => (el.type === OfferStatus.BUY_OFFER && el.sell_id === parseInt(this.offerId) && el.current_status !== OfferStatus.BUY_OFFER_REJECTED))
          this.incomingOffers.rows = this.incomingOffers.rows.concat(rws)
        }
        this.incomingOffers.more = more
        this.incomingOffers.nextKey = nextKey
        if (done) {
          done()
        }
      }
      this.loading = false
    },
    async resetPagination () {
      this.incomingOffers = {
        more: true,
        rows: [],
        nextKey: undefined
      }
      await this.$nextTick()
      this.$refs.customInfinite.stop()
      await this.$nextTick()
      this.$refs.customInfinite.resume()
      await this.$nextTick()
      this.$refs.customInfinite.trigger()
    },
    async getOfferInfo () {
      try {
        this.offer = await this.getSellOfferById(this.offerId)
      } catch (error) {
      }
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
    max-height: 45vh
  .custom-size
    color: $warning
    width: 60%
  .custom-font
    font-family: 'SF Pro Display'
  #noData
    height: 50vh !important
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
</style>
