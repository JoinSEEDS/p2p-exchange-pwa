<template lang="pug">
#container
    q-tab-panels.panelContainer(
        v-model="tab"
        animated
        transition-prev="scale"
        transition-next="scale"
        class="bg-primary text-white"
    )
        q-tab-panel(name="main").tabContainer
          main-tab
        q-tab-panel(name="transactions").tabContainer
          offers-tab
            //- .text-h6 Ofer
            //- p Lorem ipsum dolor sit amet consectetur adipisicing elit.
        q-tab-panel(name="notifications").tabContainer
            .text-h6 Notifications
            p Lorem ipsum dolor sit amet consectetur adipisicing elit.
        q-tab-panel(name="settings").tabContainer
            .text-h6 Settings
            p Lorem ipsum dolor sit amet consectetur adipisicing elit.
    q-separator(color="warning")
    q-tabs.tabsContainer(
        v-model="tab"
        class="bg-primary text-grey-5 custom-border"
        align="justify"
        indicator-color="transparent"
        active-color="accent"
    )
        q-tab(name="main").tab-style
            i.i-main(:class=" tab === 'main' ? 'tab-icon-active' : 'tab-icon'")
        q-tab(name="transactions").tab-style
            i.i-transactions(:class=" tab === 'transactions' ? 'tab-icon-active' : 'tab-icon'")
        q-tab(name="notifications").tab-style
            i.i-notification(:class=" tab === 'notifications' ? 'tab-icon-active' : 'tab-icon'")
        q-tab(name="settings").tab-style
            i.i-settings(:class=" tab === 'settings' ? 'tab-icon-active' : 'tab-icon'")
</template>

<script>
import mainTab from '~/pages/main-tab/main-tab'
import offersTab from '~/pages/offers/mainOffersTab'
export default {
  name: 'dashboard-screens',
  components: { mainTab, offersTab },
  data () {
    return {
      tab: 'main'
    }
  }
}
</script>

<style lang="sass" scoped>
#container
    display: flex
    flex-direction: column
    // height: 50vh !important
    padding: 0px

.panelContainer
    flex: 1
    display: flex
    background: pink

.tab-icon
  display: inline-block
  width: 25px
  height: 25px
  background: white

.tab-icon-active
  display: inline-block
  width: 25px
  height: 25px
  background: $accent

.tabContainer
  height: 86vh
  display: flex
  flex-direction: column
  padding: 30px

.tab-style
  border-top-color: #E9EDD9 !important
  border-top-width: medium !important
  border: medium
  color: #E9EDD9

@media screen and ( min-width: $breakpoint-mobile )
  .tabContainer
    padding: 10px

</style>
