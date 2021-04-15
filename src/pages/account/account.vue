<template lang="pug">
 #container
    .text-h5.text-white Complete your profile
    .text-weight-regular.text-white General information
    q-form.q-gutter-lg.q-mt-md
      q-input(
        label="Nickname"
        v-model="params.nickname"
        outlined
        dark
        standout="text-accent"
      )
      q-select(
        label="Time Zone"
        v-model="params.timeZone"
        outlined
        dark
        standout="text-accent"
        color="white"
        :options="options.timeZone"
        emit-value
        map-options
      )
      q-select(
        label="Preferred Fiat Currency"
        v-model="params.preferredFiatCurrency"
        outlined
        dark
        standout="text-accent"
        :options="options.preferredFiatCurrency"
        emit-value
        map-options
        color="white"
      )
      q-select(
        label="Preferred Contact Method"
        v-model="params.preferredContactMethod"
        outlined
        dark
        standout="text-accent"
        :options="options.preferredContactMethod"
        emit-value
        map-options
        color="white"
      )
    q-separator(dark)
</template>

<script>
export default {
  name: 'account',
  data () {
    return {
      params: {
        nickname: undefined,
        preferredFiatCurrency: undefined,
        preferredContactMethod: undefined
      },
      options: {
        timeZone: [
          {
            label: 'MX',
            value: 'mx-timezone'
          },
          {
            label: 'US',
            value: 'us-timezone'
          }
        ],
        preferredFiatCurrency: [
          {
            label: 'USD',
            value: 'usd'
          },
          {
            label: 'MXN',
            value: 'mxn'
          }
        ],
        preferredContactMethod: [
          {
            label: 'Email',
            value: 'email'
          },
          {
            label: 'Cellphone',
            value: 'cellphone'
          }
        ]
      }
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
