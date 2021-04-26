<template lang="pug">
.q-pa-md
  q-avatar.cursor-pointer(v-ripple)
    img(src='https://cdn.quasar.dev/img/avatar.png')
    q-menu
      .row.no-wrap.q-pa-md
        .column
          .text-h6.q-mb-md Settings
          q-toggle(v-model='mobileData' label='Use Mobile Data')
          q-toggle(v-model='bluetooth' label='Bluetooth')
        q-separator.q-mx-lg(vertical='' inset='')
        .column.items-center
          q-avatar(size='72px')
            img(src='https://cdn.quasar.dev/img/avatar4.jpg')
          .text-subtitle1.q-mt-md.q-mb-xs John Doe
          q-btn(color='primary' label='Logout' push='' size='sm' v-close-popup='')

</template>

<script>
export default {
  name: 'profile-menu',
  data () {
    return {
      mobileData: true,
      bluetooth: false
    }
  }
}
</script>
