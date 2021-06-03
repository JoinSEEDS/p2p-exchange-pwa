<template lang="pug">
#modal-container.full-width
 q-card.q-pa-md.bg-light
    .row.justify-between
      .subtitle.text-dark.q-mb-xs {{$t('pages.general.filter')}}
      green-flat-btn(:label="$t('pages.general.close')" v-close-popup)
    q-form.q-px-xs(@submit.prevent="onSubmitForm")
      q-select(
        :label="$t('pages.account.timeZone')"
        v-model="value.timeZone"
        outlined
        standout="text-dark"
        :options="CommonTimeZoneOptions"
        emit-value
        map-options
        :rules="[rules.required]"
      )
      q-select(
        :label="$t('pages.account.preferredFiatCurrency')"
        v-model="value.fiatCurrency"
        outlined
        standout="text-dark"
        :options="commonCurrenciesOptions"
        emit-value
        map-options
        :rules="[rules.required]"
      )
      //- q-input(
      //-     :label="$t('pages.deposit.amount')"
      //-     v-model="params.amount"
      //-     outlined
      //-     standout="text-dark"
      //-     :rules="[rules.required]"
      //-     type="number"
      //-     min="0"
      //-     step="0.000001"
      //- )
      //- q-btn.full-width(
      //-   :label="$t('pages.general.filter')"
      //-   color="accent"
      //-   type="submit"
      //-   )
</template>

<script>
import { validation } from '~/mixins/validation'
import { mapActions } from 'vuex'
import { CommonCurrencies, CommonTimeZone } from '~/const'

export default {
  name: 'filter-offer',
  mixins: [validation],
  props: {
    value: {

    }
  },
  data () {
    return {
      filters: {
        timeZone: 'all',
        fiatCurrency: 'all'
      }
    }
  },
  computed: {
    commonCurrenciesOptions () {
      const options = []
      options.push({
        label: 'All',
        value: 'all'
      })
      for (let currency in CommonCurrencies) {
        options.push({
          label: `${CommonCurrencies[currency].name} (${CommonCurrencies[currency].symbol})`,
          value: CommonCurrencies[currency].code.toLowerCase()
        })
      }
      return options
    },
    CommonTimeZoneOptions () {
      const options = [{
        label: 'All',
        value: 'all'
      }]
      const timeZones = CommonTimeZone.map(v => {
        return {
          label: v.text,
          value: v.abbr.toLowerCase()
        }
      })
      return options.concat(timeZones)
    }
  },
  methods: {
    ...mapActions('accounts', ['deposit', 'withdraw']),
    async onSubmitForm () {
      try {
        this.$emit('success', this.filters)
      } catch (e) {

      }
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
