<template lang="pug">
#container
    q-tab-panels.panelContainer(
        v-model="tab"
        animated
        transition-prev="scale"
        transition-next="scale"
        class="bg-primary text-white"
    )
        q-tab-panel(name="main")
            main-tab
        q-tab-panel(name="transactions")
            .text-h6 Transactions
            p Lorem ipsum dolor sit amet consectetur adipisicing elit.
        q-tab-panel(name="notifications")
            .text-h6 Notifications
            p Lorem ipsum dolor sit amet consectetur adipisicing elit.
        q-tab-panel(name="settings")
            .text-h6 Settings
            p Lorem ipsum dolor sit amet consectetur adipisicing elit.
    q-tabs.tabsContainer(
        v-model="tab"
        class="bg-primary text-grey-5 shadow-2"
        align="justify"
        indicator-color="transparent"
        active-color="accent"
    )
        q-tab(name="main")
            i.i-main(:class=" tab === 'main' ? 'tab-icon-active' : 'tab-icon'")
        q-tab(name="transactions")
            i.i-transactions(:class=" tab === 'transactions' ? 'tab-icon-active' : 'tab-icon'")
        q-tab(name="notifications")
            i.i-notification(:class=" tab === 'notifications' ? 'tab-icon-active' : 'tab-icon'")
        q-tab(name="settings")
            i.i-settings(:class=" tab === 'settings' ? 'tab-icon-active' : 'tab-icon'")
</template>

<script>
import mainTab from '~/pages/main-tab/main-tab'
export default {
  name: 'dashboard-screens',
  components: { mainTab },
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

</style>
