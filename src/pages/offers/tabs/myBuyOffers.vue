<template lang="pug">
#containerBuyOffers
  q-pull-to-refresh(@refresh="refresh")
    #offersEmpty(v-if="myOffers.rows.length === 0 && loading")
      skeleton-offer-item
    .container(v-if="myOffers.rows.length === 0 && !loading")
      #list.row
        .empty-list.self-center.col.items-center
          .row.justify-center.q-mb-md
            .fiat-icon.text-center
          .empty-label {{ $t('pages.offers.make_first') }}
          .empty-label {{ $t('pages.offers.buy_offer').toUpperCase() }}
    q-infinite-scroll.infiniteScroll(@load="onLoad" :offset="scrollOffset" :scroll-target="$refs.scrollTarget" ref="customInfinite")
        #containerScroll(ref="scrollTarget")
                #items(v-for="offer in myOffers.rows")
                    offer-buy-item(:offer="offer" v-if="offer.buyer === account")
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import OfferBuyItem from '../components/offer-buy-item'
import { EventBus } from '~/event-bus.js'
import { OfferStatus } from '~/const/OfferStatus'

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
      },
      OfferStatus
    }
  },
  mounted () {
    EventBus.$on('canceled', async () => {
      this.resetPagination()
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
      this.loading = true
      if (this.myOffers.more) {
        const { rows, more, next_key: nextKey } = await this.getMyBuyOffers({
          limit: this.limit,
          nextKey: this.myOffers.nextKey
        })
        if (rows) {
          for (const row of rows) {
            if (row.buyer === this.account && row.type === OfferStatus.BUY_OFFER && row.current_status !== OfferStatus.BUY_OFFER_REJECTED) {
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

#list
  height: 100%

.container-view-btn
  position: relative

.empty-label
  font-family: SF Pro Display
  font-size: 18px
  font-style: normal
  font-weight: 700
  line-height: 21px
  letter-spacing: 0em
  text-align: center
  color: #E9EDD9

.view-btn
  font-size: 14px
  font-style: normal
  font-weight: 500
  line-height: 17px
  letter-spacing: 0em
  color: #1F992A
  padding: 5px
  border-radius: 10px

</style>
