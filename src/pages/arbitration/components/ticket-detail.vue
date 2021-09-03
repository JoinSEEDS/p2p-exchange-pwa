<template lang="pug">
 #container
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
          .text-h6.text-center.text-white Ticket inited date:
            span.q-ml-md {{ TimeUtil.formatDateOnly(new Date(offer.created_date)) }}
    .row.q-mb-xl(v-if="offer")
      .col-12.q-mb-md
        .text-white.q-mb-sm {{ $t('pages.arbitration.buyer', {buyer: offer.buyer}) }}
        contact(phone="999-999-99")
      .col-12
        .text-white.q-mb-sm {{ $t('pages.arbitration.seller', {seller: offer.seller}) }}
        contact(phone="999-999-99")
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
      TimeUtil,
      showTicketForm: false
    }
  },
  async mounted () {
    this.offer = await this.getOffer(this.offerId)
    this.setOfferId(this.offerId)
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
    }
  },
  methods: {
    ...mapActions('buyOffers', ['getOffer']),
    ...mapMutations('arbitration', ['setOfferId']),
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
