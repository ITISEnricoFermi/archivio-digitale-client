<template>
<div id="app">
  <router-view></router-view>
</div>
</template>

<script>
export default {
  name: "app",
  sockets: {
    disconnect() {
      console.log("Connection lost.");;
    }
  }
}
</script>

<style lang="scss">

</style>
