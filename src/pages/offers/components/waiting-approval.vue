<template lang="pug">
  #container.full-width
    q-card.q-pa-md.bg-light.q-gutter-md
      .row.justify-between
        .subtitle.text-dark Waiting...
        green-flat-btn(:label="$t('pages.general.close')" v-close-popup)
      .row
        .col-12
          .text-dark Your offer is pending of approval.
        .col-12
          .text-dark Details:
      .col.text-center
        .text-dark.text-h6 {{ quantity }}
        hr.custom-size
        .text-dark.text-h6 ${{ equivalentFiat }}
</template>

<script>
export default {
  name: 'waiwting-approval',
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
