<template lang="pug">
#container
  .row
    img.avatar-icon.self-center(src="../icons/seedIcon.png")
    .col.q-px-md.q-py-md
        .text-white {{ offer.offerer }}
        .text-white {{ offer.amount }}
        .text-weight-bold.text-info {{ offer.memo }}
  .row.q-my-md
    .col
        q-btn.full-width(
            :label="$t('common.buttons.waiting')"
            color="orange-6"
            @click="takeOffer"
            size="md"
        ).q-py-sm.full-width
        q-separator.full-width.q-my-md(color="warning")
</template>

<script>
export default {
  name: 'offer-buy-item',
  props: {
    offer: {
      type: Object,
      default: () => undefined
    }
  },
  methods: {
    takeOffer () {
      // this.$router.push({ name: 'buy', params: { id: this.offer.id } })
    }
  },
  created () {
    console.log('offer buy', this.offer)
  }
}
</script>

<style lang="sass" scoped>
.avatar-icon
  width: 60px
  height: 60px
</style>
