<template>
  <div id="app">
    <app-header></app-header>
  </div>
</template>

<script>

import Header from '@/components/home.route/header'

export default {
  name: 'search',
  data: () => {
    return {

    }
  },
  components: {
    appHeader: Header
  }
}
</script>

<style lang="scss">

.header {

  &__bottom {
    display: none;
  }
}
</style>
