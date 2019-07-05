<template>
<main class="panel">
  <div class="left-sidebar">
    <app-options :title="title" :options="options"></app-options>
  </div>
  <div class="center">
    <transition name="panel" mode="out-in">
      <keep-alive>
        <router-view :user="user"></router-view>
      </keep-alive>
    </transition>
  </div>
</main>
</template>

<script>
import Options from '@/components/options/options'

export default {
  props: ['user'],
  data () {
    return {
      options: [{
        crop: 'Account',
        icon: 'fas fa-user-circle',
        link: '/settings/account/'
      }, {
        crop: 'Autenticazione',
        icon: 'fas fa-fingerprint',
        link: '/settings/authentication/'
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
    grid-template-columns: 30rem minmax(0, 1fr);
    grid-gap: 3vh;

    @include respond(tab-por) {
        grid-template-columns: minmax(0, 1fr);
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
