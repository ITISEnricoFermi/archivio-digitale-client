<template>
<div class="box">
  <app-header></app-header>
  <router-view />
  <app-footer></app-footer>
</div>
</template>

<script>

import Header from './components/header'
import Footer from './components/footer'

export default {
  data () {
    return {
      projects: []
    }
  },
  components: {
    appHeader: Header,
    appFooter: Footer
  }
}
</script>

<style lang="scss">
body {
    min-height: 100vh!important;
    height: auto!important;
}

.box {
    width: 100%;
    height: auto;
    max-width: 100vw;
    min-height: 100vh;
    overflow-x: hidden;
    box-shadow: 0 0.25rem 0.75rem rgba(black, 0.05);
    // display: grid;
    // grid-template-columns: 1fr;
    // grid-template-rows: auto minmax(10rem, min-content);
}
</style>
