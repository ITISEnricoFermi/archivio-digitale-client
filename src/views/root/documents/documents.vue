<template>
<main class="panel">
  <div class="left-sidebar">
    <app-options :title="title" :options="options"></app-options>
  </div>
  <div class="center">
    <router-view :types="types" :faculties="faculties" :visibilities="visibilities" :sections="sections" :grades="grades"></router-view>
  </div>
</main>
</template>
<script>

import Options from '@/components/options/options'

export default {
  props: ['types', 'faculties', 'visibilities', 'sections', 'grades'],
  data () {
    return {
      options: [{
        crop: 'Crea documento',
        icon: 'fas fa-pencil-alt',
        link: '/documents/create/'
      }, {
        crop: 'Cerca documento',
        icon: 'fa fa-search',
        link: '/documents/search/'
      }, {
        crop: 'Trasferisci documenti',
        icon: 'fas fa-exchange-alt',
        link: '/documents/transfer/'
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
