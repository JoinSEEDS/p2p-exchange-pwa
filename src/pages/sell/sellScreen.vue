<template lang="pug">
#container
  q-icon.cursor-pointer(name="keyboard_backspace" color="white" size="md" @click="$router.replace({ name: 'dashboard' })")
  q-form.q-gutter-md.q-mt-sm
    .subtitle.text-white.q-mt-md {{ $t('pages.sell.toSell') }}
    .text-white {{ $t('pages.sell.defineTheSaleOffer') }}
    .row.justify-center
        .col-5
            .text-h4.text-white.text-center 1,224.31
            q-separator(color="warning")
            .text-h6.text-white.text-center {{ $t('pages.sell.seeds') }}
    q-input(
        :label="$t('pages.sell.amountOfCrypto')"
        v-model="params.nickname"
        outlined
        dark
        standout="text-accent"
        :rules="[rules.required]"
        :hint="$t('pages.sell.afterTransaction', { amount: '1,999.32' })"
    )
    q-input(
        :label="$t('pages.sell.preferredCurrency')"
        v-model="params.pref"
        outlined
        dark
        disable
        standout="text-accent"
        :rules="[rules.required]"
        bg-color="warning"
    )
    q-input(
        :label="$t('pages.sell.costPerCrypto')"
        v-model="params.pref1"
        outlined
        dark
        standout="text-accent"
        :rules="[rules.required]"
        :hint="$t('pages.sell.marketCost', { amount: '12.28 USD' })"
    )
    .row.bg-primary.btnSave.q-py-sm
        q-btn.full-width(
            :label="$t('pages.sell.toSell')"
            color="accent"
            type="submit"
        )
</template>

<script>
import { validation } from '~/mixins/validation'
export default {
  name: 'seel-screen',
  mixins: [validation],
  data () {
    return {
      params: {

      }
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
