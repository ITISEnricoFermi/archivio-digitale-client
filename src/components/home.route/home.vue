<template>
<div id="app">
  <main>
    <section>
      <app-header></app-header>
      <app-search></app-search>
    </section>
  </main>
</div>
</template>

<script>
import Header from './header'
import Search from './search'

export default {
  name: 'home',
  data: () => {
    return {

    }
  },
  components: {
    appHeader: Header,
    appSearch: Search
  }
}
</script>

<style lang="scss">
body {

    #app {
        width: 100vw;
        height: 100vh;
        background-image: linear-gradient(45deg, lighten($color-primary, 0%), lighten($color-primary, 12.5%));
        padding: 3vh;

        main {
            height: 100%;
            width: 100%;
            box-shadow: 0 0.25rem 0.75rem rgba($color-black, 0.05);
            &>section {
                height: 100%;
                width: 100%;
                background-image: linear-gradient(to right bottom, $color-black, $color-secondary), url("/static/layout/bg.jpg");
                background-blend-mode: screen;
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;

                position: relative;
            }
        }

    }
}
</style>
