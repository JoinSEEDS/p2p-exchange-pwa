<template lang="pug">
.div
  q-badge.q-ml-xs(class="reputation opacity" color="red")
  q-badge.q-ml-xs(class="reputation opacity" color="yellow")
  q-badge.q-ml-xs(class="reputation opacity" color="orange")
  q-badge.q-ml-xs(class="reputation" color="green")
</template>

<script>
export default {
  name: 'buy-offer-reputation'
}
</script>

<style lang="sass">
.reputation
  border-radius: 0
.opacity
  opacity: 0.4
</style>
