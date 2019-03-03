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

</style>
