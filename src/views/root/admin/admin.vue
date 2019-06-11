<template>
<main class="panel">
  <div class="left-sidebar">
    <app-options :title="title" :options="options"></app-options>
  </div>
  <div class="center">
    <router-view :privileges="privileges"></router-view>
  </div>
</main>
</template>

<script>

import Options from '@/components/options/options'

export default {
  props: ['privileges'],
  mounted () {
    console.log(this.privileges, this.subjects)
  },
  data () {
    return {
      options: [{
        crop: 'Richieste di iscrizione',
        icon: 'fas fa-tasks',
        link: '/admin/services/'
      }, {
        crop: 'Invia email',
        icon: 'fas fa-paper-plane',
        link: '/admin/sendmail/'
      }, {
        crop: 'Entità',
        icon: 'fas fa-stream',
        link: '/admin/entities/'
      }, {
        crop: 'Crea utente',
        icon: 'fas fa-plus',
        link: '/admin/users/create/'
      }, {
        crop: 'Cerca utenti',
        icon: 'fas fa-users',
        link: '/admin/users/search/'
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
