<template lang="pug">
q-card.q-pa-md.bg-light.custom-round
  .row
    .subtitle.text-dark.q-mb-xs {{ $t('pages.arbitration.arbitration') }}
  .row
    .text-subtitle2.text-dark.text-red.q-mb-md {{ $t('pages.arbitration.sure_close_ticket', { id: getOfferId }) }}
  .row
    q-btn.full-width(
      :label="$t('common.buttons.confirm')"
      color="accent"
      @click="$emit('confirm')"
      v-close-popup
    ).custom-round.q-mb-sm
  .row
    q-btn.full-width(
      :label="$t('common.buttons.cancel')"
      color="negative"
      v-close-popup
    ).custom-round
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'confirmation-ticket',
  computed: {
    ...mapGetters('arbitration', ['getOfferId'])
  }
}
</script>

<style>
</style>
