<template lang="pug">
#containerSellOffers
  #offersEmpty(v-if="myOffers.rows.length === 0 && loading")
    skeleton-offer-item
  #noData(v-if="myOffers.rows.length === 0 && !loading")
    .text-h4.custom-font {{ $t('pages.offers.make_first') }}
    .text-h5.custom-font {{ $t('pages.offers.sell_offer').toUpperCase() }}
  q-pull-to-refresh(@refresh="refresh" :scroll-target="$refs.scrollTarget")
    q-infinite-scroll.infiniteScroll(@load="onLoad" :offset="scrollOffset" :scroll-target="$refs.scrollTarget" ref="customInfinite")
      #containerScroll(ref="scrollTarget")
        #items(v-for="offer in myOffers.rows")
          offer-sell-item(:offer="offer")
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import OfferSellItem from '../components/offer-sell-item'
import { OfferStatus } from '~/const/OfferStatus'

export default {
  name: 'my-sell-offers',
  data () {
    return {
      OfferStatus,
      scrollOffset: 1000,
      loading: true,
      limit: 4,
      myOffers: {
        rows: [],
        nextKey: undefined,
        more: true
      }
    }
  },
  computed: {
    ...mapGetters('accounts', ['account'])
  },
  mounted () {
    this.myOffers.rows = []
  },
  components: { OfferSellItem },
  watch: {
    'myOffers.rows' (v) {
      if (v.length > 1) {
        this.scrollOffset = 200
      }
    }
  },
  methods: {
    ...mapActions('sellOffers', ['getMySellOffers']),
    async refresh (done) {
      this.resetPagination()
      done()
    },
    async onLoad (index, done) {
      this.loading = true
      if (this.myOffers.more) {
        const { rows, more, next_key: nextKey } = await this.getMySellOffers({
          limit: this.limit,
          nextKey: this.myOffers.nextKey
        })
        if (rows) {
          for (const row of rows) {
            if (row.seller === this.account && row.type === OfferStatus.SELL_OFFER && row.current_status !== OfferStatus.SELL_OFFER_SOLDOUT) {
              this.myOffers.rows.push(row)
            }
          }
        }
        this.myOffers.more = more
        this.myOffers.nextKey = nextKey
        if (done) {
          done()
        }
      }
      this.loading = false
    },
    async resetPagination () {
      this.myOffers = {
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
    }
  }
}
</script>

<style lang="sass" scoped>
#containerSellOffers
  display: flex
  flex-direction: column

#offersEmpty
  flex: 1

#containerScroll
  overflow: auto
  flex: 1
  max-height: 500px

#noData
  height: 60vh !important
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
</style>
