<template lang="pug">
  #container
    .row.justify-between
        .subtitle {{ $t('pages.mainTab.recentActivity') }}
        .container-view-btn(v-ripple v-if="listRecentActivity")
            .view-btn.self-center {{ $t('pages.mainTab.viewAll') }}
    #list.row
        .empty-list.self-center.col.items-center
            .row.justify-center.q-mb-md
                .fiat-icon.text-center
            .empty-label {{ $t('pages.mainTab.makeYour') }}
            .empty-label {{ $t('pages.mainTab.firstTransaction').toUpperCase() }}
</template>

<script>
export default {
  name: 'recent-activity-view',
  data () {
    return {
      listRecentActivity: undefined
    }
  }
}
</script>

<style lang="sass" scoped>
.view-btn
    font-size: 14px
    font-style: normal
    font-weight: 500
    line-height: 17px
    letter-spacing: 0em
    color: #1F992A
    padding: 5px
    border-radius: 10px
.container-view-btn
    position: relative
.empty-label
    font-family: SF Pro Display
    font-size: 18px
    font-style: normal
    font-weight: 700
    line-height: 21px
    letter-spacing: 0em
    text-align: center
    color: #E9EDD9
#container
    display: flex
    flex-direction: column
    height: 100%
#list
    // background-color: $accent
    height: 100%

.fiat-icon
  background-image: url('./icons/fiat.svg')
  background-repeat: no-repeat
  background-size: contain
  display: inline-block
  width: 40px
  height: 70px
  text-align: center
</style>
