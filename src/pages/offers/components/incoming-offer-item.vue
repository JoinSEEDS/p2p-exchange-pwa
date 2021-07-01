<template lang="pug">
#subContainer(@click="showOptions = !showOptions")
  .row
    img.avatar-icon.self-center(src="../icons/seedIcon.png")
    .col.q-px-md.q-py-md
        .text-white #[strong {{ offer.buyer }}] wants to buy #[strong {{ offer.quantity }}]
        .text-grey-8 {{ offer.time }}
        .text-info.text-bold More information
        //- div.full-width.flex.items-center.q-mb-sm
        //-   q-icon(name="timer" class="text-red" size="xs")
        //-   .text-info.q-ml-sm {{$t('pages.offers.timeTo', {time: '10:10'})}}
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

</style>
