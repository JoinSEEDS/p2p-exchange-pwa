<template lang="pug">
#container
  .row.justify-between
    .subtitle.text-white.q-mt-md {{ $t('pages.arbitration.arbitration') }}
  q-tabs(
    v-model="tab"
    active-color="accent"
    class="text-white text-bold"
    flat
  )
    q-tab(name="available" :label="$t('pages.arbitration.available')")
    q-tab(name="assigned" :label="$t('pages.arbitration.assigned')")
  q-separator

  q-tab-panels(v-model="tab" animated).bg-primary
    q-tab-panel(name="available")
      available-tickets
    q-tab-panel(name="assigned")
      assigned-tickets
</template>

<script>
import AvailableTickets from './tabs/available-tickets.vue'
import AssignedTickets from './tabs/assigned-tickets.vue'

export default {
  name: 'arbitration',
  components: { AvailableTickets, AssignedTickets },
  data () {
    return {
      tab: 'available'
    }
  }
}
</script>

<style>

</style>
