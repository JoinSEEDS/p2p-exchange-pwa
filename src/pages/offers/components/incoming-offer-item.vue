<template lang="pug">
#subContainer
  .row
    .q-mt-sm(style="position: relative")
      .yellow-dot
      img.avatar-icon.self-center(src="../../../statics/app-icons/seller.svg")
    .col.q-px-md.q-py-sm
        .text-white #[strong {{ offer.buyer }}]
        .text-white.q-mt-md {{ quantity }} =
          span.text-info.text-bold  ${{ equivalentFiat}}
        //- div.full-width.flex.items-center.q-mt-xs
        //-   q-icon(name="timer" color="red" size="xs")
        //-   small.text-white.q-ml-sm {{$t('pages.offers.timeTo', {time: '10:10'})}}
  .row.justify-center
    q-btn.custom-width.custom-round(
      :label="$t('common.buttons.view_details')"
      color="accent"
      class="text-cap"
      @click="showOptions = !showOptions"
      no-caps
      v-if="pending"
    )
    q-btn.custom-width.custom-round(
      :label="$t('common.buttons.waiting_payment')"
      color="blue"
      class="text-cap"
      no-caps
      v-if="accepted"
    )
    q-btn.custom-width.custom-round(
      :label="$t('common.buttons.confirm_payment')"
      color="blue"
      class="text-cap"
      @click="showOptions = !showOptions"
      no-caps
      v-if="paid"
    )
  #modals
    q-dialog(v-model="showOptions" transition-show="slide-up" transition-hide="slide-down" persistent)
      buy-offer(:offer="offer")
</template>

<script>
import { OfferStatus } from '~/const/OfferStatus'
import buyOffer from '~/pages/buy-offer/buy-offer'
import { EventBus } from '~/event-bus'

export default {
  name: 'offer-buy-item',
  components: { buyOffer },
  props: {
    offer: {
      type: Object,
      default: () => undefined
    }
  },
  mounted () {
    EventBus.$on('confirmOffer', async () => {
      this.showOptions = false
    })
  },
  beforeDestroy () {
    EventBus.$off('confirmOffer')
  },
  data () {
    return {
      showOptions: false,
      OfferStatus
    }
  },
  computed: {
    pending () {
      return this.offer.current_status === OfferStatus.BUY_OFFER_PENDING
    },
    paid () {
      return this.offer.current_status === OfferStatus.BUY_OFFER_PAID
    },
    accepted () {
      return this.offer.current_status === OfferStatus.BUY_OFFER_ACCEPTED
    },
    quantity () {
      return this.offer.quantity_info.find(el => el.key === 'buyquantity').value
    },
    equivalentFiat () {
      try {
        return this.parseSeedsToCurrentFiatWithSymbol(this.quantity.split(' ')[0])
      } catch (e) {
        console.error(e)
        return 0
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.avatar-icon
  width: 55px
  height: 55px
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
