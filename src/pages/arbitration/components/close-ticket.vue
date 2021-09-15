<template lang="pug">
q-card.q-pa-md.bg-light.custom-round
  .row.justify-between
    .subtitle.text-dark.q-mb-xs {{ $t('pages.arbitration.close_ticket') }}
  q-form.q-px-xs(@submit.prevent="onSubmitForm")
    .text-normal.text-dark.q-mb-md {{ $t('pages.arbitration.close_ticket_favor') }}
    .row
      .col
        q-radio(v-model="params.favor" val="seller").q-radio-custom
          .row.items-center.justify-center
            q-avatar(color="warning" text-color="white")
              img.input-img.img-seller(src="~/assets/seller.svg")
          .row.items-center.justify-center
            .text-black {{ $t('pages.buy.seller') }}
      .col
        q-radio(v-model="params.favor" val="buyer").q-radio-custom
          .row.items-center.justify-center
            q-avatar(color="warning" text-color="white")
              img.input-img.img-buyer(src="~/assets/buyer.svg")
          .row.items-center.justify-center
            .text-black {{ $t('pages.buy.buyer') }}
    .text-normal.text-dark.q-mb-sm.q-mt-lg {{ $t('pages.arbitration.explain_reasons') }}
    div
      q-input.q-mb-lg(
        v-model="params.notes"
        outlined
        standout="text-dark"
        type="textarea"
        min="0"
        maxlength="200"
        placeholder="Write here..."
        :bottom-slots="true"
      )
        template(v-slot:hint)
          .text-black.text-right Minimum 200 characters.
    q-btn.full-width(
      label="Close ticket"
      color="accent"
      type="submit"
      :disable="!params.favor"
    ).custom-round.q-mb-sm
    q-btn.full-width(
      label="Cancel"
      color="negative"
      type="submit"
      v-close-popup
    ).custom-round
  q-dialog(v-model="showTicketConfirmation" transition-show="slide-up" transition-hide="slide-down" persistent)
    confirmation-ticket(@confirm="onConfirm")
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ConfirmationTicket from './confirmation-ticket'

export default {
  name: 'close-tickets',
  components: { ConfirmationTicket },
  data () {
    return {
      params: {
        notes: '',
        favor: undefined
      },
      showTicketConfirmation: false
    }
  },
  computed: {
    ...mapGetters('arbitration', ['getOfferId'])
  },
  methods: {
    ...mapActions('arbitration', ['resolveToBuyer', 'resolveToSeller']),
    onSubmitForm () {
      this.showTicketConfirmation = true
    },
    onConfirm () {
      this.favorTo()
    },
    async favorTo () {
      try {
        if (this.params.favor === 'buyer') {
          const res = await this.resolveToBuyer({ offerId: this.getOfferId, notes: this.params.notes })
          if (res) {
            this.$emit('close-ticket')
            this.$router.push({ name: 'arbitration' })
            this.showSuccessMsg(this.$root.$t('pages.arbitration.resolved_buyer'))
          }
        } else if (this.params.favor === 'seller') {
          const res = await this.resolveToSeller({ offerId: this.getOfferId, notes: this.params.notes })
          if (res) {
            this.$emit('close-ticket')
            this.$router.push({ name: 'arbitration' })
            this.showSuccessMsg(this.$root.$t('pages.arbitration.resolved_seller'))
          }
        }
      } catch (e) {
      }
    }
  }
}
</script>

<style lang="sass" scope>
.input-img
  width: 30px !important
  height: 30px !important

.q-radio-custom svg
  display: none

.q-radio-custom:focus .q-radio__inner::before
  display: none

.q-radio-custom:hover .q-radio__inner::before
  display: none

.q-radio-custom:focus, .q-radio-custom > .q-radio__inner--truthy ~ .q-radio__label
  .q-avatar
    background-color: $accent !important
    border: 2px solid #e9edd9
    box-shadow: 0 0 5px $accent
    & .img-buyer
      margin-left: -6px
    & .img-seller
      margin-left: -4px
</style>
