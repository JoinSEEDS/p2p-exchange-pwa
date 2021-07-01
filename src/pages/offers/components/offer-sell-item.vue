<template lang="pug">
#subContainer
  .row.q-mb-sm
    img.avatar-icon.self-center(src="../icons/seedIcon.png")
    .col.q-px-md.q-py-md
        .text-white {{ offer.seller }}
        .text-white {{ quantity }}
        .text-weight-bold.text-info {{ price }}
  .row
    .col
        //- div.full-width.flex.justify-center.items-center.q-mb-sm
        //-   q-icon(name="timer" class="text-red" size="xs")
        //-   .text-caption.q-ml-sm {{$t('pages.offers.timeTo', {time: '10:10'})}}
        q-btn.full-width(
            :label="$t('common.buttons.view_details')"
            color="accent"
            class="text-cap"
            @click="takeOffer()"
        )
        q-separator.full-width.q-my-sm(color="warning")
  //- #modals
  //-   q-dialog(v-model="showIncomingOffers" transition-show="slide-up" transition-hide="slide-down")
  //-     incoming-buy-offers
</template>

<script>
import { OfferStatus } from '~/const/OfferStatus'
import IncomingBuyOffers from '../incomingBuyOffers.vue'
export default {
  name: 'offer-sell-item',
  components: { IncomingBuyOffers },
  props: {
    offer: {
      type: Object,
      default: () => undefined
    }
  },
  data () {
    return {
      OfferStatus,
      showIncomingOffers: false
    }
  },
  computed: {
    quantity () {
      const buyQuantity = this.offer.quantity_info.find(v => {
        return v.key === 'available'
      })
      return buyQuantity ? buyQuantity.value : 'UNKNOWN'
    },
    price () {
      const { key, value } = this.offer.price_info[0]
      return `${value} ${key}`
    }
  },
  methods: {
    takeOffer () {
      this.showIncomingOffers = true
      // console.log(this.offer.id)
      this.$router.push({ name: 'incoming-buy-offers', params: { id: this.offer.id } })
      // this.$router.push({ name: 'make-payment', params: { id: this.offer.id } })
    }
  }
}
</script>

<style lang="sass" scoped>
.avatar-icon
  width: 60px
  height: 60px
.text-cap
  text-transform: capitalize
</style>
