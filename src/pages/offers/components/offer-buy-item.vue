<template lang="pug">
#subContainer
  .row
    img.avatar-icon.self-center(src="../icons/seedIcon.png")
    .col.q-px-md.q-py-md
        .text-white {{ $t('pages.buy.seller') }}: {{ offer.seller }}
        .text-white {{ quantity }}
        .text-cancel(v-if="offer.current_status === OfferStatus.BUY_OFFER_PENDING" @click="cancel = !cancel") Cancel offer
  .row
    .col
        q-btn.full-width(
            v-if="offer.current_status === OfferStatus.BUY_OFFER_ACCEPTED"
            :label="$t('common.buttons.make_payment')"
            color="blue-9"
            @click="$router.push({ name: 'make-payment', params: { id: offer.id } })"
        ).custom-round
        q-btn.full-width(
            v-if="offer.current_status === OfferStatus.BUY_OFFER_PAID"
            label="WAITING PAY CONFIRM"
            color="blue-9"
        ).custom-round
        q-btn.full-width(
            v-if="offer.current_status === OfferStatus.BUY_OFFER_SUCCESS"
            label="DONE"
            color="blue"
        ).custom-round
        q-btn.full-width(
            v-if="offer.current_status === OfferStatus.BUY_OFFER_PENDING"
            :label="$t('common.buttons.waiting')"
            color="orange-8"
            @click="waiting = !waiting"
        ).custom-round
        q-separator.full-width.q-my-sm(color="warning")
  #modals
    q-dialog(v-model="waiting" transition-show="slide-up" transition-hide="slzide-down")
      waiting-approval(:offer="offer").custom-size-modal
    q-dialog(v-model="cancel" transition-show="slide-up" transition-hide="slide-down")
      confirm-cancel(:id="offer.id" @canceledBtn="cancel = !cancel")

</template>

<script>
import { OfferStatus } from '~/const/OfferStatus'
import WaitingApproval from './waiting-approval.vue'
import ConfirmCancel from './confirm-cancel.vue'

export default {
  name: 'offer-buy-item',
  components: { WaitingApproval, ConfirmCancel },
  props: {
    offer: {
      type: Object,
      default: () => undefined
    }
  },
  data () {
    return {
      OfferStatus,
      waiting: false,
      cancel: false
    }
  },
  computed: {
    quantity () {
      const buyQuantity = this.offer.quantity_info.find(v => {
        return v.key === 'buyquantity'
      })
      return buyQuantity.value || 'UNKNOWN'
    }
  },
  methods: {
    takeOffer () {
      // this.$router.push({ name: 'buy', params: { id: this.offer.id } })
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
