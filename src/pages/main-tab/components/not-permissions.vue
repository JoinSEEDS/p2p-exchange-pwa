<template lang="pug">
q-card.q-pa-md.bg-light.custom-round
  .row.justify-between
    .subtitle.text-dark.q-mb-xs.text-red You don't have permissions to sell
    green-flat-btn(flat :label="$t('pages.general.close')" @click="$emit('onClose')")
</template>

<script>
export default {
  name: 'not-permissions'
}
</script>

<style scope>
</style>
