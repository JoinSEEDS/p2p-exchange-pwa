<template lang="pug">
#subContainer
  .row
    img.avatar-icon.self-center(src="../icons/seedIcon.png")
    .col.q-px-md.q-py-md
        .text-white {{ $t('pages.buy.seller') }}: {{ offer.seller }}
        .text-white {{ quantity }}
        //- .text-cancel(v-if="offer.current_status === OfferStatus.BUY_OFFER_PENDING" @click="cancel = !cancel") Cancel offer
  .row
    .col
        q-btn.full-width(
            v-if="offer.current_status === OfferStatus.BUY_OFFER_ACCEPTED"
            :label="$t('common.buttons.confirm_payment')"
            color="blue-9"
            @click="$router.push({ name: 'make-payment', params: { id: offer.id } })"
            no-caps
        ).custom-round
        q-btn.full-width(
            v-if="offer.current_status === OfferStatus.BUY_OFFER_PAID"
            label="WAITING PAY CONFIRM"
            color="blue-9"
        ).custom-round
        q-btn.full-width(
            v-if="offer.current_status === OfferStatus.BUY_OFFER_PENDING"
            :label="$t('common.buttons.waiting')"
            color="orange-8"
            @click="waiting = !waiting"
            no-caps
        ).custom-round
        q-btn.full-width(
            v-if="offer.current_status === OfferStatus.BUY_OFFER_ARBITRAGE"
            :label="$t('common.buttons.sendContactMethod')"
            color="orange-8"
            @click="waiting = !waiting"
            no-caps
        ).custom-round
        init-arbitrage-button(
        v-if="offer.current_status === OfferStatus.BUY_OFFER_PAID"
        :buyOfferId="this.offer.id"
        ).full-width
        q-separator.full-width.q-my-sm(color="warning")
  #modals
    q-dialog(v-model="waiting" transition-show="slide-up" transition-hide="slzide-down")
      waiting-approval(:offer="offer").custom-size-modal

</template>

<script>
import { OfferStatus } from '~/const/OfferStatus'
import WaitingApproval from './waiting-approval.vue'
import InitArbitrageButton from '~/components/init-arbitrage-button'

export default {
  name: 'offer-buy-item',
  components: { WaitingApproval, InitArbitrageButton },
  props: {
    offer: {
      type: Object,
      default: () => undefined
    }
  },
  data () {
    return {
      OfferStatus,
      waiting: false
    }
  },
  computed: {
    quantity () {
      const buyQuantity = this.offer.quantity_info.find(v => {
        return v.key === 'buyquantity'
      })
      return buyQuantity.value || 'UNKNOWN'
    }
  }
}
</script>

<style lang="sass" scoped>
.avatar-icon
  width: 60px
  height: 60px

.text-cancel
  text-decoration: underline
  text-text-decoration-color: red
  color: red
  font-weight: bold
  cursor: pointer
</style>
