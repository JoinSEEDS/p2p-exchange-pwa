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
        .text-white Percentage: 10%
        .text-white Sold: 432:00 SEEDS
          q-icon(name="arrow_upward" color="red").q-ml-sm
    q-separator(color="warning").q-my-sm
    .subtitle.text-white.q-my-sm {{ $t('pages.incoming_offers.proposals') }}
    #containerScroll
      #items(v-for="(offer, index) in incomingOffers")
        incoming-offer-item(:offer="offer")
        q-separator.full-width.q-my-sm(color="warning" v-if="index+1 != incomingOffers.length")

</template>

<script>
import { mapActions } from 'vuex'
import incomingOfferItem from './components/incoming-offer-item.vue'

export default {
  name: 'incoming-buy-offers',
  components: { incomingOfferItem },
  computed: {
    offerId () {
      return this.$route.params.id
    },
    // available () {
    //   return this.offer.quantity_info.find(el => el.key === 'available').value
    // },
    offered () {
      return this.offer.quantity_info.find(el => el.key === 'totaloffered').value
    },
    priceper () {
      return this.offer.price_info.find(el => el.key === 'priceper').value
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
      offer: undefined,
      incomingOffers: [
        {
          id: 0,
          buyer: 'Jhon Doe',
          quantity: '20.0000 SEEDS',
          time: '10 minutes ago'
        },
        {
          id: 1,
          buyer: 'Doe Jhon',
          quantity: '100.0000 SEEDS',
          time: '2 hours ago'
        },
        {
          id: 2,
          buyer: 'Jane Doe',
          quantity: '30.0000 SEEDS',
          time: '3 hours ago'
        },
        {
          id: 3,
          buyer: 'Richard Roe',
          quantity: '20 SEEDS',
          time: '20 hours ago'
        },
        {
          id: 0,
          buyer: 'Jhon Doe',
          quantity: '20.0000 SEEDS',
          time: '10 minutes ago'
        },
        {
          id: 1,
          buyer: 'Doe Jhon',
          quantity: '100.0000 SEEDS',
          time: '2 hours ago'
        },
        {
          id: 2,
          buyer: 'Jane Doe',
          quantity: '30.0000 SEEDS',
          time: '3 hours ago'
        },
        {
          id: 3,
          buyer: 'Richard Roe',
          quantity: '20 SEEDS',
          time: '20 hours ago'
        }
      ]
    }
  },
  created () {
    this.getBuyOffers()
  },
  methods: {
    ...mapActions('buySellRels', ['getBuyOffersBySellOffer']),
    ...mapActions('sellOffers', ['getSellOfferById']),
    async getBuyOffers () {
      try {
        this.offer = await this.getSellOfferById(this.offerId)
      } catch (error) {
        console.log(error)
      }
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
    max-height: 650px
  .custom-size
    color: $warning
    width: 60%
  .custom-font
    font-family: 'SF Pro Display'

</style>
