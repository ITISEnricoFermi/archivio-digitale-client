<template>
<main class="main">
  <router-view />
  <app-footer></app-footer>
</main>
</template>

<script>
import Footer from './components/footer'

export default {
  name: 'home',
  data () {
    return {
      projects: []
    }
  },
  components: {
    appFooter: Footer
  }
}
</script>

<style lang="scss">
body {
    min-height: 100vh!important;
    height: auto!important;
}

.main {
    width: 100vw;
    max-width: 100vw;
    overflow-x: hidden;
    min-height: 100vh;
    height: auto;
    box-shadow: 0 0.25rem 0.75rem rgba($color-black, 0.05);
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto minmax(10rem, min-content);
}
</style>
