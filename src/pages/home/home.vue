<template>
<router-view/>
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

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Bitter|Roboto:300,400,500,700');
</style>
