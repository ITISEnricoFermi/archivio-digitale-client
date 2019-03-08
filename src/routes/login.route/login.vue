<template>
<main class="main">
  <keep-alive>
    <app-notifications></app-notifications>
  </keep-alive>
  <div class="login-box module module--padded">
    <div class="row">
      <div class="col-1-of-1">
        <a href="/home/">
          <img src="/logo/itisFermi.svg" class="logo" alt="ITIS Enrico Fermi">
        </a>
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-1">
        <input type="email" class="textfield" placeholder="Email" autocomplete="off" v-model="user.email" @keyup.enter="login">
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-1">
        <input type="password" class="textfield" placeholder="Password" autocomplete="off" v-model="user.password" @keyup.enter="login">
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-1">
        <button class="button button--green" @click="login">
          <span>Entra</span>
        </button>
      </div>
    </div>
  </div>
<app-footer-light></app-footer-light>
</main>
</template>

<script>

import eventBus from '@/utils/eventBus'
import service from '@/utils/service'

import FooterLight from '@/components/footer/light.footer'
import Notifications from '@/components/notifications/notifications'

export default {
  name: 'login',
  data: () => {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      if (!this.user.email && !this.user.password) {
        return false
      }

      try {
        const response = await service.post('/login/', this.user)
        const { token } = response.data
        const { _id } = JSON.parse(atob(token.split('.')[1]))
        localStorage.setItem('token', token)
        localStorage.setItem('id', _id)
        // document.cookie = `token=${token}`
        window.location.replace('/dashboard')
      } catch (e) {
        eventBus.notification({
          title: e.response.data.messages[0],
          temporary: true
        })
      }
    }
  },
  components: {
    appFooterLight: FooterLight,
    appNotifications: Notifications
  }
}
</script>

<style scoped lang="scss">

.main {
  position: relative;
  width: 100vw;
  max-width: 100vw;
  overflow-x: hidden;
  min-height: 100vh;

  .login-box {
    position: absolute;
    @include absCenter;
    width: 20vw!important;

    @include respond(big-desktop) {
      width: 15vw!important;
    }

    @include respond(tab-lan) {
      width: 40vw!important;
    }

    @include respond(tab-por) {
      width: 60vw!important;
    }

    @include respond(phone) {
      width: 80vw!important;
    }

    .logo {
      width: 50%;

      @include respond(big-desktop) {
        width: 45%;
        margin-bottom: 1rem;
      }

      @include respond(tab-lan) {
        width: 40%;
      }

    }

    .error {
      font-size: 1.2rem;
    }

  }
}

</style>
