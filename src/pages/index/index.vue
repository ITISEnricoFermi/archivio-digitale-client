<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
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
    min-height: 100vh;
    background-color: $color-white-2;
    width: 100vw;
    max-width: 100vw;
    overflow-x: hidden;

    @include color-scheme(dark) {
        background: #282828!important;
    }

    @include respond(tab-lan) {
        height: auto;
    }
}
</style>
