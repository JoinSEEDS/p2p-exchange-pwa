<template lang="pug">
#subContainer
  .row
    .q-mt-sm(style="position: relative")
      .yellow-dot
      img.avatar-icon.self-center(src="../../../statics/app-icons/buyer.svg")
    .col.q-px-md.q-py-md
        //- .text-white Available: {{ quantity }}
        .text-white {{  $t('pages.sell.available', { amount: quantity }) }}
        //- .text-white Offered: {{ offered }}
        .text-white {{  $t('pages.sell.percentage', { percentage }) }}
        .text-white {{  $t('pages.sell.sold', { sold }) }}
          q-icon(name="arrow_upward" color="red").q-ml-sm
  .row
    .col
        q-btn.full-width.custom-round(
            :label="$t('common.buttons.view_details')"
            color="accent"
            @click="takeOffer()"
            no-caps
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
    offered () {
      return this.offer.quantity_info.find(el => el.key === 'totaloffered').value
    },
    price () {
      const { key, value } = this.offer.price_info[0]
      return `${value} ${key}`
    },
    percentage () {
      return `${this.offer.price_info.find(el => el.key === 'priceper').value}%`
    },
    sold () {
      let available = this.quantity
      let offered = this.offer.quantity_info.find(el => el.key === 'totaloffered').value
      return `${(this.amountOf(offered) - this.amountOf(available)).toFixed(4)} SEEDS`
    }
  },
  methods: {
    takeOffer () {
      this.showIncomingOffers = true
      this.$router.push({ name: 'incoming-buy-offers', params: { id: this.offer.id } })
    },
    amountOf (asset) {
      return parseFloat(asset.split(' ')[0])
    }
  }
}
</script>

<style lang="sass" scoped>
.avatar-icon
  width: 60px
  height: 60px
  background-color: $warning
  border-radius: 50%
  padding: 20%

.yellow-dot
  width: 10px
  height: 10px
  background-color: #F2994A
  border-radius: 50%
  z-index: 2
  position: absolute
  right: 5%
  top: 8%
.text-cap
  text-transform: capitalize

</style>
