<template>
<main class="panel">
  <app-settings></app-settings>
  <app-signup-requests></app-signup-requests>
</main>
</template>

<script>

import signupRequests from './../components/signupRequests'
import Settings from './../components/app.settings'

export default {
  components: {
    appSignupRequests: signupRequests,
    appSettings: Settings
  }
}
</script>

<style scoped lang="scss">
  .panel {
    padding: 3vh;
  }
</style>
