<template lang="pug">
  #containerIncomingOffers(v-if="offer")
    q-icon.cursor-pointer(name="keyboard_backspace" color="white" size="md" @click="$router.replace({ name: 'dashboard', params: { tab: 'transactions' } })")
    //- .row.full-width
    #offerData.text-center
      .text-white {{ offer.seller }}
      //- .text-white Status: {{ offer.current_status }}
      //- .text-white Available: {{ available }}
      .text-white {{ offered }}
      .text-info.text-bold {{ priceper }} priceper
        //- div.full-width.flex.justify-center.items-center.q-mb-sm
          q-icon(name="timer" class="text-red" size="xs")
          .text-caption.q-ml-sm {{$t('pages.offers.timeTo', {time: '10:10'})}}
    q-separator(color="white").q-my-md
    #containerScroll
      #items(v-for="(offer, index) in incomingOffers")
        incoming-offer-item(:offer="offer").cursor-pointer
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
    }
  },
  data () {
    return {
      offer: undefined,
      incomingOffers: [
        {
          id: 0,
          buyer: 'Jhon Doe',
          quantity: '20 SEEDS',
          time: '10 minutes ago'
        },
        {
          id: 1,
          buyer: 'Doe Jhon',
          quantity: '100 SEEDS',
          time: '2 hours ago'
        },
        {
          id: 2,
          buyer: 'Jane Doe',
          quantity: '30 SEEDS',
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
        // let incomingBuyOffers = await this.getBuyOffersBySellOffer({ sellOfferId: 4 })
        this.offer = await this.getSellOfferById(this.offerId)
        // console.log('buyselrell found', incomingBuyOffers)
        // console.log('sell offer', this.offer)
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

</style>
