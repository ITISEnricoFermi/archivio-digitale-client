<template>
<div id="app" class="main__home">
  <link href="https://fonts.googleapis.com/css?family=Bitter:400,700" rel="stylesheet">
  <app-header></app-header>
  <router-view/>
  <app-footer></app-footer>
</div>
</template>

<script>
import Header from './components/header'
import Footer from './components/footer'

export default {
  name: 'home',
  data: () => {
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

.main__home {
    width: 100vw;
    min-height: 100vh;
    height: auto;
    box-shadow: 0 0.25rem 0.75rem rgba($color-black, 0.05);

}
</style>
