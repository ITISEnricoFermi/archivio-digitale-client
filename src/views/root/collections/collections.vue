<template>
<main class="panel">
  <div class="left-sidebar">
    <app-options :title="title" :options="options"></app-options>
  </div>
  <div class="center">
    <transition name="panel" mode="out-in">
      <keep-alive>
        <router-view :collectionsPermissions="collectionsPermissions"></router-view>
      </keep-alive>
    </transition>
  </div>
</main>
</template>
<script>
import Options from '@/components/options/options'

export default {
  props: ['collectionsPermissions'],
  data () {
    return {
      options: [{
        crop: 'Cerca collezioni',
        icon: 'fa fa-search',
        link: '/collections/search/'
      }, {
        crop: 'Crea collezioni',
        icon: 'fas fa-pencil-alt',
        link: '/collections/create/'
      }],
      title: {
        crop: 'Servizi',
        icon: 'fas fa-rocket'
      }
    }
  },
  components: {
    appOptions: Options
  }
}
</script>

<style scoped lang="scss">
.panel {
    padding: 3vh;
    display: grid;
    grid-template-columns: 30rem auto;
    grid-gap: 3vh;

    @include respond(tab-por) {
        grid-template-columns: 1fr;
        grid-template-rows: 6rem auto;
    }

    .left-sidebar {

        @include respond(tab-por) {
            position: fixed;
            bottom: 0;
            width: 100%;
            left: 0;
        }

    }
}
</style>
