<template lang="pug">
#subContainer
  .row
    .q-mt-sm(style="position: relative")
      .yellow-dot
      img.avatar-icon.self-center(src="../../../statics/app-icons/seller.svg")
    .col.q-px-md.q-py-sm
        .text-white #[strong {{ offer.buyer }}]
        .text-white {{ offer.quantity }}
        .text-info.text-bold ${{ equivalentFiat}}
        div.full-width.flex.items-center.q-mt-xs
          q-icon(name="timer" color="red" size="xs")
          small.text-white.q-ml-sm {{$t('pages.offers.timeTo', {time: '10:10'})}}
  .row.justify-center
    q-btn.custom-width.custom-round(
      :label="$t('common.buttons.view_details')"
      color="accent"
      class="text-cap"
      @click="showOptions = !showOptions"
      no-caps
    )
  #modals
    q-dialog(v-model="showOptions" transition-show="slide-up" transition-hide="slide-down" persistent)
      buy-offer(:offer="offer")
      //- accept-decline-offer.custom-size-modal
</template>

<script>
// import { OfferStatus } from '~/const/OfferStatus'
// import acceptDeclineOffer from './accept-decline-offer.vue'
import buyOffer from '~/pages/buy-offer/buy-offer'
export default {
  name: 'offer-buy-item',
  components: { buyOffer },
  props: {
    offer: {
      type: Object,
      default: () => undefined
    }
  },
  data () {
    return {
      showOptions: false
    }
  },
  computed: {
    equivalentFiat () {
      try {
        return this.parseSeedsToCurrentFiatWithSymbol(this.offer.quantity.split(' ')[0])
      } catch (e) {
        console.error(e)
        return 0
      }
    }
  }
  // computed: {
  //   quantity () {
  //     const buyQuantity = this.offer.quantity_info.find(v => {
  //       return v.key === 'buyquantity'
  //     })
  //     return buyQuantity.value || 'UNKNOWN'
  //   }
  // },
  // methods: {
  //   takeOffer () {
  //     // this.$router.push({ name: 'buy', params: { id: this.offer.id } })
  //   }
  // }
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

.custom-width
  width: 95%

</style>
