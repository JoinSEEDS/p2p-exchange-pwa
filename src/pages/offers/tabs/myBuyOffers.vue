<template lang="pug">
#containerBuyOffers
  q-pull-to-refresh(@refresh="refresh")
    #offersEmpty(v-if="myOffers.rows.length === 0 && loading")
        skeleton-offer-item
    q-infinite-scroll.infiniteScroll(@load="onLoad" :offset="scrollOffset" :scroll-target="$refs.scrollTarget" ref="customInfinite")
        #containerScroll(ref="scrollTarget")
                #items(v-for="offer in myOffers.rows")
                    offer-buy-item(:offer="offer" v-if="offer.buyer === account")
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import OfferBuyItem from '../components/offer-buy-item'
import { EventBus } from '~/event-bus.js'

export default {
  name: 'my-buy-offers',
  data () {
    return {
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
  mounted () {
    EventBus.$on('canceled', async () => {
      // this.onLoad(0, true)
      this.resetPagination()
      console.log('refresh offers TODO')
    })
  },
  beforeDestroy () {
    EventBus.$off('canceled')
  },
  computed: {
    ...mapGetters('accounts', ['account'])
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
    ...mapActions('buyOffers', ['getMyBuyOffers']),
    async refresh (done) {
      this.resetPagination()
      done()
    },
    async onLoad (index, done) {
      // console.log('onLoad', this.myOffers.more)
      this.loading = true
      if (this.myOffers.more) {
        const { rows, more, next_key: nextKey } = await this.getMyBuyOffers({
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
      // console.log('resetPagination')
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
  // max-height: 460px

#offersEmpty
  flex: 1

#containerScroll
  overflow: auto
  flex: 1
  max-height: 500px

</style>
