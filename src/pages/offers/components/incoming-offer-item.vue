<template lang="pug">
#subContainer
  .row.q-pa-sm
    .q-mt-sm(style="position: relative")
      .yellow-dot
      img.avatar-icon.self-center(src="../../../statics/app-icons/seller.svg")
    .col.q-px-md.q-py-sm
        .text-white #[strong {{ offer.buyer }}]
        .text-white {{ quantity }} =
          span.text-info.text-bold  ${{ equivalentFiat}}
          .text-info.q-mt-xs(v-if="finished") {{ $t('pages.incoming_offers.finished') }}
          div(v-if="hasRemainingTime && pending").full-width.flex.items-center.q-mt-xs
            q-icon(name="timer" :color="remainingColor" size="xs")
            small.text-white.q-ml-sm {{$t('pages.offers.timeTo', { time: remaining })}}
  .row.justify-center
    q-btn.custom-width.custom-round(
      :label="$t('common.buttons.view_details')"
      color="accent"
      class="text-cap"
      @click="showOptions = !showOptions"
      no-caps
      v-if="pending"
      dense
    )
    q-btn.custom-width.custom-round(
      :label="$t('common.buttons.waiting_payment_confirmation')"
      color="blue"
      class="text-cap"
      no-caps
      v-if="accepted"
      disabled
      dense
    )
    q-btn.custom-width.custom-round(
      :label="$t('common.buttons.confirm_payment')"
      color="blue"
      class="text-cap"
      @click="showOptions = !showOptions"
      no-caps
      v-if="paid"
      dense
    )
    q-btn.custom-width.custom-round(
      :label="$t('common.buttons.rejected')"
      color="grey-7"
      class="text-cap"
      no-caps
      v-if="rejected"
      dense
    )
    q-btn.custom-width.custom-round(
      :label="$t('common.buttons.sendContactMethod')"
      color="orange-8"
      class="text-cap"
      no-caps
      v-if="arbitrageSendContact && !isContactMethodSent"
      @click="sendContactMethodsMessage"
      dense
    )
    q-btn.custom-width.custom-round(
      :label="$t('common.buttons.sentContactMethod')"
      color="orange-8"
      class="text-cap"
      no-caps
      v-if="arbitrageSendContact && isContactMethodSent"
      @click="sendContactMethodsMessage"
      dense
      disable
    )
    q-btn.full-width(
      v-if="arbitragePending"
      :label="$t('common.buttons.arbitrage')"
      color="orange-8"
      disabled
      dense
    ).custom-round
    .text-white.text-center.text-subtitle1(v-if="flagged") {{ $t('pages.arbitration.flagged_to') }} {{ ticket.resolution }}
    init-arbitrage-button(v-if="showArbitrage && (accepted || paid)" :buyOfferId="this.offer.id").custom-width
  #modals
    q-dialog(v-model="showOptions" transition-show="slide-up" transition-hide="slide-down" persistent)
      buy-offer(:offer="offer")
</template>

<script>
import { mapActions } from 'vuex'
import { OfferStatus } from '~/const/OfferStatus'
import buyOffer from '~/pages/buy-offer/buy-offer'
import { EventBus } from '~/event-bus'
import InitArbitrageButton from '~/components/init-arbitrage-button'

export default {
  name: 'incoming-buy-offer-item',
  components: { buyOffer, InitArbitrageButton },
  props: {
    offer: {
      type: Object,
      default: () => undefined
    }
  },
  async mounted () {
    let { remainingMinutes: remaining, percentage } = await this.remainingTimeToAcceptOffer(this.offer.created_date)
    this.percentage = percentage
    this.remaining = (remaining > 0) ? this.getHoursAndMinutes(remaining) : ''

    const dateOfAccepted = this.offer.status_history.find(item => item.key === OfferStatus.BUY_OFFER_ACCEPTED)

    if (dateOfAccepted) {
      this.showArbitrage = await this.sellerCanInitArbitrage(dateOfAccepted.value)
    }
    // console.log('showArbitrage', showArbitrage)
    if (this.flagged) {
      this.ticket = await this.getTicketById({ id: this.offer.id })
    }

    EventBus.$on('confirmOffer', async () => {
      this.showOptions = false
    })

    this.getIsContactMethodSent()
  },
  beforeDestroy () {
    EventBus.$off('confirmOffer')
  },
  data () {
    return {
      showOptions: false,
      OfferStatus,
      remaining: '',
      hasRemainingTime: false,
      remainingTime: {
        hours: 0,
        minutes: 0
      },
      showArbitrage: false,
      percentage: 0,
      ticket: undefined,
      isContactMethodSent: false
    }
  },
  methods: {
    ...mapActions('encryption', ['createMessage']),
    ...mapActions('profiles', ['getPaypal', 'getContactMethod']),
    ...mapActions('arbitration', ['getTicketById', 'sendContactMethods', 'getIsContactMethodSentByAccount']),
    getHoursAndMinutes (minutes) {
      this.hasRemainingTime = true

      let hours = Math.floor(minutes / 60)
      let mins = minutes % 60
      this.remainingTime.hours = hours
      this.remainingTime.minutes = mins

      return `${hours}h ${mins.toFixed(0)}m`
    },
    async sendContactMethodsMessage () {
      try {
        let ticket = await this.getTicketById({ id: this.offer.id })
        let messageData = await this.createMessage({ buyOfferId: this.offer.id, message: await this.getContactMethod(), recipientAccount: ticket.arbiter })
        await this.sendContactMethods({ messageData })
        EventBus.$emit('confirmOffer')
        this.showSuccessMsg(this.$root.$t('pages.arbitration.contact_methods_sent'))
      } catch (error) {
        console.error(error)
      }
    },
    async getIsContactMethodSent () {
      this.isContactMethodSent = await this.getIsContactMethodSentByAccount({
        buyOfferId: this.offer.id
      })
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
      return this.offer.quantity_info.find(el => el.key === 'buyquantity').value || ''
    },
    rejected () {
      return this.offer.current_status === OfferStatus.BUY_OFFER_REJECTED
    },
    finished () {
      return this.offer.current_status === OfferStatus.BUY_OFFER_SUCCESS
    },
    arbitragePending () {
      return this.offer.current_status === OfferStatus.BUY_OFFER_ARBITRAGE_PENDING
    },
    arbitrageSendContact () {
      return this.offer.current_status === OfferStatus.BUY_OFFER_ARBITRAGE_INPROGRESS
    },
    flagged () {
      return this.offer.current_status === OfferStatus.BUY_OFFER_FLAGGED
    },
    equivalentFiat () {
      try {
        return this.parseSeedsToCurrentFiatWithSymbol(this.quantity.split(' ')[0])
      } catch (e) {
        console.error(e)
        return 0
      }
    },
    remainingColor () {
      return (this.percentage > 66) ? 'green' : (this.percentage > 33) ? 'orange' : 'red'
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
