<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

import '@fortawesome/fontawesome-free/js/all.js'

export default {
  name: 'app',
  sockets: {
    disconnect () {
      console.log('Connection lost.')
    }
  }
}
</script>

<style scoped lang="scss">
</style>
