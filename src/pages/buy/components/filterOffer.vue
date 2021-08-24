<template lang="pug">
#modal-container.full-width
 q-card.q-pa-md.bg-light
    .row.justify-between
      .subtitle.text-dark.q-mb-xs {{$t('pages.general.filter')}}
      green-flat-btn(:label="$t('pages.general.close')" v-close-popup)
    q-form.q-px-xs(@submit.prevent="onSubmitForm")
      q-select(
        :label="$t('pages.offers.filterBy')"
        v-model="selectedFilter.filterLabel"
        outlined
        standout="text-dark"
        :options="filters"
        map-options
        :rules="[rules.required]"
      )
      q-select(
        :label="CustomLabel"
        v-model="selectedFilter.filterValue"
        outlined
        standout="text-dark"
        :options="CustomOptions"
        map-options
        :rules="[rules.required]"
        v-if="showSelectValue"
        ref="selectValue"
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
      q-btn.full-width(
        :label="$t('pages.general.filter')"
        color="accent"
        type="submit"
        )
</template>

<script>
import { validation } from '~/mixins/validation'
import { mapActions } from 'vuex'
import { CommonCurrencies, CommonTimeZone } from '~/const'

export default {
  name: 'filter-offer',
  mixins: [validation],
  props: {
    filter: {
      default: () => {
        return {
          filterLabel: {
            label: 'None',
            value: 11
          },
          filterValue: {
            label: undefined,
            value: undefined
          }
        }
      }
    }
  },
  data () {
    return {
      firstChange: true,
      showSelectValue: false,
      selectedFilter: {
        filterValue: undefined,
        filterLabel: undefined
      },
      filters: [
        {
          label: 'None',
          value: 11
        },
        {
          label: 'Time Zone',
          value: 12
        },
        {
          label: 'Fiat Currency',
          value: 13
        }
      ]
    }
  },
  beforeMount () {
    this.selectedFilter = {
      ...this.filter
    }
  },
  watch: {
    async 'selectedFilter.filterLabel' (v) {
      if (v.value === 11) {
        this.selectedFilter.filterValue = {
          label: undefined,
          value: undefined
        }
        this.showSelectValue = false
      } else {
        this.showSelectValue = true
        if (!this.firstChange) {
          await this.$nextTick()
          this.$refs.selectValue.showPopup()
        }
      }
      this.firstChange = false
    }
  },
  computed: {
    CommonCurrenciesOptions () {
      const options = []
      for (let currency in CommonCurrencies) {
        options.push({
          label: `${CommonCurrencies[currency].name} (${CommonCurrencies[currency].symbol})`,
          value: CommonCurrencies[currency].code.toLowerCase()
        })
      }
      return options
    },
    CommonTimeZoneOptions () {
      const timeZones = CommonTimeZone.map(v => {
        return {
          label: v.text,
          value: v.abbr.toLowerCase()
        }
      })
      return timeZones
    },
    CustomOptions () {
      switch (this.selectedFilter.filterLabel.value) {
        case 11:
          return undefined
        case 12:
          return this.CommonTimeZoneOptions
        case 13:
          return this.CommonCurrenciesOptions
        default:
          return undefined
      }
    },
    CustomLabel () {
      switch (this.selectedFilter.filterLabel.value) {
        case 11:
          return undefined
        case 12:
          return this.$t('pages.offers.timeZone')
        case 13:
          return this.$t('pages.offers.fiatCurrency')
        default:
          return undefined
      }
    }
  },
  methods: {
    ...mapActions('accounts', ['deposit', 'withdraw']),
    async onSubmitForm () {
      try {
        this.$emit('success', this.selectedFilter)
      } catch (e) {

      }
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
