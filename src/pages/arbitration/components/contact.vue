<template lang="pug">
.full-width.row.custom-round.overflow-hidden
  .col-2.bg-signal-blue.flex.justify-center(@click="toSignal")
    img(src="~/assets/signal.svg")
  .col.bg-grey-contact.q-py-md
    .text-white.q-mx-sm.text-subtitle1 {{ phone }}
  .col-1.bg-grey-contact.q-py-md.cursor-pointer(@click="toClipboard")
    q-icon(name="content_copy" size="sm" color="white")
</template>

<script>
import { copyToClipboard } from 'quasar'

export default {
  name: 'contact',
  props: {
    phone: {
      type: String
    }
  },
  methods: {
    async toClipboard () {
      try {
        await copyToClipboard(this.phone)
      } catch {
        this.showErrorMsg('Error to copy')
      } finally {
        this.showSuccessMsg(`${this.phone} copy to clipboard`)
      }
    },
    toSignal () {
      console.log('Click to signal')
    }
  }
}
</script>

<style lang="sass" scope>
.bg-grey-contact
  background-color: #828282
.bg-signal-blue
  background-color: #3A76F0;
</style>
