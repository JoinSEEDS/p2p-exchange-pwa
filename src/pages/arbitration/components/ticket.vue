<template lang="pug">
#container
  .q-pa-md
    .row
      q-avatar.purple-ticket
        img(src="~/assets/arrows.svg")
      .col.q-px-md.q-pb-sm
          .text-weight-bold.text-white {{ $t('pages.arbitration.ticket') }} {{ ticket.offer_id }}
          .text-white(v-if="offer") {{ $t('pages.arbitration.buyer', { buyer }) }}
          .text-white(v-if="offer") {{ $t('pages.arbitration.seller', { seller }) }}
          .text-white.text-caption {{ TimeUtil.formatDateOnly(new Date(ticket.created_date)) }}
    .row.q-mt-sm
      .col
          q-btn.full-width(
              :label="$t('pages.arbitration.follow_up')"
              color="accent"
              size="md"
              v-if="isAssignedTicket"
              no-caps
              @click="onFollowUp"
          )
          q-btn.full-width(
              :label="$t('pages.arbitration.view_details')"
              color="accent"
              size="md"
              no-caps
              v-else
              @click="onViewDetail"
          )
          q-separator.full-width.q-my-md(color="warning")
</template>

<script>
import { mapActions } from 'vuex'
import TimeUtil from '~/utils/TimeUtil'

export default {
  name: 'ticket',
  props: {
    isAssignedTicket: {
      type: Boolean,
      default: false
    },
    ticket: {
      type: Object,
      default: undefined
    }
  },
  computed: {
    buyer () {
      return 'buyer'
    },
    seller () {
      return 'seller'
    }
  },
  data () {
    return {
      offer: undefined,
      TimeUtil
    }
  },
  // async mounted () {
  //   this.offer = await this.getOffer(this.ticket.offer_id)
  // },
  methods: {
    ...mapActions('buyOffers', ['getOffer']),
    ...mapActions('arbitration', ['setArbiterToOffer']),
    async onFollowUp () {
      try {
        // const response = await this.setArbiterToOffer({ offerId: this.ticket.offer_id })
        // this.showTransactionId(response.transactionId)
        const response = await this.setArbiterToOffer({ offerId: this.ticket.offer_id })

        if (response) {
          this.showSuccessMsg(this.$root.$t('pages.arbitration.ticket_taken'))
          this.$emit('tickedUpdated')
        }
      } catch (e) {

      }
      console.log('Follow-up')
    },
    onViewDetail () {
      // console.log('View Detail')
      this.$router.push({ name: 'ticket', params: { id: this.ticket.offer_id } })
    }
  }
}
</script>

<style>
.purple-ticket {
  background-color: #9B51E0;
}

</style>
