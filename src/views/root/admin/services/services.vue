<template>
<main class="panel">
  <app-settings></app-settings>
  <app-requests></app-requests>
</main>
</template>

<script>

import Requests from './components/requests'
import Settings from './components/app.settings'

export default {
  components: {
    appRequests: Requests,
    appSettings: Settings
  }
}
</script>

<style scoped lang="scss">
  .panel {
    padding: 3vh;
  }
</style>
