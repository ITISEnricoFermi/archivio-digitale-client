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
</style>
