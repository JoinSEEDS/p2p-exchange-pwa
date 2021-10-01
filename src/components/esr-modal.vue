<template lang="pug">
    .row.justify-center
        .col-6
            q-dialog(ref="esrModal" @before-hide="onHide")
                q-card.q-pa-md.full-width(v-if="esrRequest")
                    .text-h5.text-center Sign Request
                    //- p {{ esrRequest }}
                    .row.justify-center
                        .col-6
                            q-img(
                                :src="esrRequest.qr"
                            )
                    q-btn.full-width(
                        type="a"
                        label="Launch wallet"
                        :href="esrRequest.esr"
                        color="primary"
                    )
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'esr-modal',
  props: {
    value: {
    },
    esrRequest: {}
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapMutations('general', ['setESRRequest']),
    onHide () {
      this.setESRRequest(null)
    }
  },
  watch: {
    showModal (v) {
      console.log('showModal', v)
      if (v) {
        this.$refs.esrModal.show()
      } else {
        this.$refs.esrModal.hide()
        this.onHide()
        this.$emit('cancel')
      }
    }
  },
  computed: {
    showModal () {
      return !!this.esrRequest
    }
  }

}
</script>

<style lang="sass" scoped>

</style>
