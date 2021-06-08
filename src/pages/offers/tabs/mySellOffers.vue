<template lang="pug">
#containerBuyOffers
    #offersEmpty(v-if="myOffers.rows.length === 0 && loading")
      skeleton-offer-item
    q-pull-to-refresh(@refresh="refresh" :scroll-target="$refs.scrollTarget")
      q-infinite-scroll.infiniteScroll(@load="onLoad" :offset="scrollOffset" :scroll-target="$refs.scrollTarget" ref="customInfinite")
        #containerScroll(ref="scrollTarget")
          #items(v-for="offer in myOffers.rows")
            offer-buy-item(:offer="offer")
</template>

<script>
import { mapActions } from 'vuex'
import OfferBuyItem from '../components/offer-buy-item'

export default {
  name: 'my-sell-offers',
  data () {
    return {
      scrollOffset: 1000,
      loading: true,
      myOffers: {
        rows: [],
        nextKey: undefined,
        more: true
      }
    }
  },
  components: { OfferBuyItem },
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
      console.log('onLoad', this.myOffers.more)
      this.loading = true
      if (this.myOffers.more) {
        const { rows, more, next_key: nextKey } = await this.getMySellOffers({
          limit: this.limit
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
#containerBuyOffers
  display: flex
  flex-direction: column

#offersEmpty
  flex: 1

#containerScroll
  overflow: auto
  flex: 1
  max-height: 650px

</style>
