<template lang="pug">
#subContainer
  .row
    img.avatar-icon.self-center(src="../icons/seedIcon.png")
    .col.q-px-md.q-py-md
        .text-white {{ $t('pages.buy.seller') }}: {{ offer.seller }}
        .text-white {{ quantity }}
        //- .text-cancel(v-if="offer.current_status === OfferStatus.BUY_OFFER_PENDING" @click="cancel = !cancel") Cancel offer
        //- .text-cancel(v-if="offer.current_status === OfferStatus.BUY_OFFER_PENDING" @click="cancel = !cancel") Cancel offer
  .row
    .col
        q-btn.full-width(
            v-if="offer.current_status === OfferStatus.BUY_OFFER_ACCEPTED"
            :label="$t('common.buttons.confirm_payment')"
            color="blue-9"
            @click="$router.push({ name: 'make-payment', params: { id: offer.id } })"
            no-caps
            dense
        ).custom-round
        q-btn.full-width(
            v-if="offer.current_status === OfferStatus.BUY_OFFER_PAID"
            label="Waiting Pay Confirm"
            color="blue-9"
            no-caps
            dense
            disable
        ).custom-round
        q-btn.full-width(
            v-if="offer.current_status === OfferStatus.BUY_OFFER_PENDING"
            :label="$t('common.buttons.waiting')"
            color="orange-8"
            @click="waiting = !waiting"
            no-caps
            dense
            disable
        ).custom-round
        q-btn.full-width(
            v-if="offer.current_status === OfferStatus.BUY_OFFER_ARBITRAGE_INPROGRESS"
            :label="$t('common.buttons.sendContactMethod')"
            color="orange-8"
            @click="sendContactMethodsMessage"
            no-caps
            dense
        ).custom-round
        .text-white.text-center.text-subtitle1(v-if="flagged") {{ $t('pages.arbitration.flagged_to') }} {{ ticket.resolution }}
        q-btn.full-width(
            v-if="offer.current_status === OfferStatus.BUY_OFFER_ARBITRAGE"
            :label="$t('common.buttons.arbitrage')"
            color="orange-8"
            no-caps
            dense
        ).custom-round
        init-arbitrage-button(
        v-if="offer.current_status === OfferStatus.BUY_OFFER_PAID && showArbitrage"
        :buyOfferId="this.offer.id"
        ).full-width
        q-separator.full-width.q-my-sm(color="warning")
  #modals
    q-dialog(v-model="waiting" transition-show="slide-up" transition-hide="slzide-down")
      waiting-approval(:offer="offer").custom-size-modal

</template>

<script>
import { mapActions } from 'vuex'
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
      waiting: false,
      showArbitrage: false,
      ticket: undefined
    }
  },
  async mounted () {
    console.log('status', this.offer.current_status)
    if (this.offer.current_status === OfferStatus.BUY_OFFER_PAID) {
      const dateOfPaid = this.offer.status_history.find(item => item.key === OfferStatus.BUY_OFFER_PAID).value
      this.showArbitrage = await this.buyerCanInitArbitrage(dateOfPaid)
    }
    if (this.flagged) {
      this.ticket = await this.getTicketById({ id: this.offer.id })
    }
  },
  computed: {
    flagged () {
      return this.offer.current_status === OfferStatus.BUY_OFFER_FLAGGED
    },
    quantity () {
      const buyQuantity = this.offer.quantity_info.find(v => {
        return v.key === 'buyquantity'
      })
      return buyQuantity.value || 'UNKNOWN'
    }
  },
  methods: {
    ...mapActions('encryption', ['createMessage']),
    ...mapActions('profiles', ['getPaypal']),
    ...mapActions('arbitration', ['getTicketById', 'sendContactMethods']),
    async sendContactMethodsMessage () {
      try {
        let ticket = await this.getTicketById({ id: this.offer.id })
        let messageData = await this.createMessage({ buyOfferId: this.offer.id, message: await this.getPaypal(), recipientAccount: ticket.arbiter })
        await this.sendContactMethods({ messageData })
        this.showSuccessMsg(this.$root.$t('pages.arbitration.contact_methods_sent'))
      } catch (error) {
        console.error(error)
      }
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
