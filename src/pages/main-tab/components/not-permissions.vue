<template lang="pug">
#container
  q-card.q-pa-md.bg-light.custom-round
    .row.justify-between
      .subtitle.text-dark.q-mb-xs Not allowed
      green-flat-btn(:label="$t('pages.general.close')" v-close-popup)
    .row.justify-center
      .text-normal.text-dark.text-red.q-mb-md Only "resident" or "citizen" users can deposit and generate sales offers
      q-btn.full-width(
        label="Accept"
        color="accent"
        @click="$emit('onClose')"
      ).custom-round
</template>

<script>
export default {
  name: 'not-permissions'
}
</script>

<style scope>
</style>
