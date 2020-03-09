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
#app {
    width: 100%;
    max-width: 100vw;
    min-height: 100vh;
    background-color: var(--color-background);
    overflow-x: hidden;

    // @include color-scheme(dark) {
    //     background: #282828!important;
    // }

    @include respond(tab-lan) {
        height: auto;
    }
}
</style>
