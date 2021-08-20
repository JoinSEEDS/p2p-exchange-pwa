<template>
  <div class="q-gutter-y-md">
    <div v-for="item in [1, 2, 3, 5]" v-bind:key="item">
        <q-item class="full-width">
            <q-item-section avatar>
                <q-skeleton type="QAvatar" class="bg-dark"/>
            </q-item-section>

            <q-item-section>
                <q-item-label>
                <q-skeleton type="text" class="bg-dark"/>
                </q-item-label>
                <q-item-label caption>
                <q-skeleton type="text" width="65%" class="bg-dark"/>
                </q-item-label>
            </q-item-section>
        </q-item>
        <div class="q-px-md">
            <q-skeleton type="QBtn" width="100%" class="bg-dark"/>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'skeleton-ticket'
}
</script>
