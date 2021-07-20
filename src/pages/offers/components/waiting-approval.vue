<template lang="pug">
  #container.full-width
    q-card.q-pa-md.bg-light.q-gutter-md
      .row.justify-between
        .subtitle.text-dark {{ $t('common.buttons.waiting') }}
        green-flat-btn(:label="$t('pages.general.close')" v-close-popup)
      .row
        .col-12
          .text-dark {{ $t('pages.sell.waiting') }}
        .col-12
          .text-dark {{ $t('pages.sell.details') }}
      .col.text-center
        .text-dark.text-h6 {{ quantity }}
        hr.custom-size
        .text-dark.text-h6 ${{ equivalentFiat }}
      .row
        .col-12
          q-btn(
            color="red"
            no-caps
            :label="$t('pages.sell.cancel')"
            v-if="offer.current_status === OfferStatus.BUY_OFFER_PENDING" @click="cancel = !cancel"
          ).full-width
    #dialogs
      q-dialog(v-model="cancel" transition-show="slide-up" transition-hide="slide-down")
        confirm-cancel(:id="offer.id" @canceledBtn="cancel = !cancel")
</template>

<script>
import { OfferStatus } from '~/const/OfferStatus'
import ConfirmCancel from './confirm-cancel.vue'

export default {
  name: 'waiwting-approval',
  components: { ConfirmCancel },
  data () {
    return {
      OfferStatus,
      cancel: false
    }
  },
  props: {
    offer: Object
  },
  computed: {
    quantity () {
      const buyQuantity = this.offer.quantity_info.find(v => {
        return v.key === 'buyquantity'
      })
      return buyQuantity.value || 'UNKNOWN'
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

<style lang="sass">
  .custom-size
    width: 60%
</style>
