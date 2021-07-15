<template lang="pug">
#containerSellOffers
    #offersEmpty(v-if="myOffers.rows.length === 0 && loading")
      skeleton-offer-item
    q-pull-to-refresh(@refresh="refresh" :scroll-target="$refs.scrollTarget")
      q-infinite-scroll.infiniteScroll(@load="onLoad" :offset="scrollOffset" :scroll-target="$refs.scrollTarget" ref="customInfinite")
        #containerScroll(ref="scrollTarget")
          #items(v-for="offer in myOffers.rows")
            offer-sell-item(:offer="offer" v-if="offer.seller === account && offer.type === OfferStatus.SELL_OFFER")
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
      // console.log('onLoad', this.myOffers.more)
      this.loading = true
      if (this.myOffers.more) {
        const { rows, more, next_key: nextKey } = await this.getMySellOffers({
          limit: this.limit,
          nextKey: this.myOffers.nextKey
        })
        if (rows) {
          // console.log('rows', rows)
          this.myOffers.rows = this.myOffers.rows.concat(rows)
        }
        this.myOffers.more = more
        this.myOffers.nextKey = nextKey
        // this.offset = this.limit
        // this.limit = this.limit + this.rowsPerLoad
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
      console.log('resetPagination')
      // this.$refs.customInfinite.stop()
      // this.onLoad()
      await this.$nextTick()
      this.$refs.customInfinite.stop()
      await this.$nextTick()
      this.$refs.customInfinite.resume()
      await this.$nextTick()
      this.$refs.customInfinite.trigger()
      // this.$refs.customInfinite.poll()
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
  max-height: 650px

</style>
