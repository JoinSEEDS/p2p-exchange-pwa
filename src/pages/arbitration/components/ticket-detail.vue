<template lang="pug">
 #container
  .q-pa-md
      q-icon.cursor-pointer(name="keyboard_backspace" color="white" size="md" @click="$router.replace({ name: 'arbitration' })")
      .row
        .text-h5.text-white.q-mt-md Ticket {{ offerId }}
      .row.justify-center.q-mb-xl
        q-avatar(size="7rem").purple-ticket
          img(src="~/assets/arrows.svg")
      #container(v-if="offer")
        .row
          .col
            .text-h4.text-center.text-white {{ quantity }}
            .text-h6.text-center.text-white {{ currency }}
        hr.custom-separator
        .row
          .col
            .text-h6.text-center.text-white {{ equivalentFiat }}
        .row.q-pt-md
          .col
            .text-center.text-white Ticket inited date:
              span.q-ml-md {{ TimeUtil.formatDateOnly(new Date(ticket.created_date)) }}
      .row.q-mb-xl(v-if="ticket")
        .col-12.q-mb-md
          .text-white.q-mb-sm {{ $t('pages.arbitration.buyer', { buyer }) }}
          q-btn.full-width(
              v-if="!buyerSendPaymentMethods"
              :label="$t('pages.arbitration.payment_method_available')"
              color="orange-8"
              no-caps
          )
          contact(v-else :phone="buyerContact")
        .col-12
          .text-white.q-mb-sm {{ $t('pages.arbitration.seller', { seller }) }}
          q-btn.full-width(
              v-if="!sellerSendPaymentMethods"
              :label="$t('pages.arbitration.payment_method_available')"
              color="orange-8"
              no-caps
          )
          contact(v-else :phone="sellerContact")
      .row.flex.self-end
        .col
          q-btn.full-width.q-mb-lg(
            label="Close ticket"
            color="accent"
            size="md"
            no-caps
            @click="onClicCloseTicket"
          )
      q-dialog(v-model="showTicketForm" transition-show="slide-up" transition-hide="slide-down" persistent)
        close-ticket(@close-ticket="showTicketForm = false")
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import TimeUtil from '~/utils/TimeUtil'
import Contact from '../components/contact.vue'
import CloseTicket from '../components/close-ticket'

export default {
  name: 'ticket-detail',
  components: { Contact, CloseTicket },
  data () {
    return {
      offer: undefined,
      ticket: undefined,
      TimeUtil,
      showTicketForm: false,
      contacts: []
    }
  },
  async beforeMount () {
    this.ticket = await this.getTicketById({ id: this.offerId })
    this.offer = await this.getOffer(this.offerId)
    this.setOfferId(this.offerId)

    this.contacts = await this.receiveContactMethods({ buyOfferId: this.offerId })
    console.log('conts', this.contacts)
    console.log(this.buyer, this.seller)
  },
  computed: {
    offerId () {
      return this.$route.params.id
    },
    quantity () {
      return this.offer.quantity_info.find(el => el.key === 'buyquantity').value.split(' ')[0]
    },
    currency () {
      return this.offer.quantity_info.find(el => el.key === 'buyquantity').value.split(' ')[1]
    },
    equivalentFiat () {
      try {
        return this.parseSeedsToCurrentFiatWithSymbol(this.quantity)
      } catch (e) {
        console.error(e)
        return 0
      }
    },
    sellerSendPaymentMethods () {
      return this.ticket.buyer_contact
    },
    buyerSendPaymentMethods () {
      return this.ticket.seller_contact
    },
    buyer () {
      return this.ticket.buyer_contact[0].key
    },
    seller () {
      return this.ticket.seller_contact[0].key
    },
    buyerContact () {
      return this.contacts.find(cont => cont.sender === this.buyer) ? this.contacts.find(cont => cont.sender === this.buyer).message : 'No contact'
      // return 'No contact'
    },
    sellerContact () {
      // return 'No contact'
      return this.contacts.find(cont => cont.sender === this.seller) ? this.contacts.find(cont => cont.sender === this.seller).message : 'No contact'
    }
  },
  methods: {
    ...mapActions('buyOffers', ['getOffer']),
    ...mapMutations('arbitration', ['setOfferId']),
    ...mapActions('arbitration', ['getTicketById']),
    ...mapActions('encryption', ['receiveContactMethods']),
    onClicCloseTicket () {
      this.showTicketForm = true
    }
  }
}
</script>

<style lang="sass" scope>
.custom-separator
  color: $warning
  width: 50%
  margin: 20px auto
</style>
