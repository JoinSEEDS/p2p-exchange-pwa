<template lang="pug">
q-card.bg-red.custom-round
  q-card-section
    .text-body2.text-white You don't have permissions to sell
  q-card-actions.justify-center
    q-btn.text-white.text-sm(flat :label="$t('pages.general.close')" @click="$emit('onClose')")
</template>

<script>
export default {
  name: 'not-permissions'
}
</script>

<style scope>
.text-sm {
  font-size: 13px;
}

.bg-red {
  background-color: #EB5757
}

</style>
