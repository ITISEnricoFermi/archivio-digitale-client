<template>
<div id="app" class="main__home">
  <link href="https://fonts.googleapis.com/css?family=Bitter:400,700" rel="stylesheet">
  <router-view />
  <app-footer></app-footer>
</div>
</template>

<script>
import Footer from './components/footer'

export default {
  name: 'home',
  data: () => {
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

.main__home {
    width: 100vw;
    min-height: 100vh;
    height: auto;
    box-shadow: 0 0.25rem 0.75rem rgba($color-black, 0.05);
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto minmax(10rem, min-content);
}
</style>
