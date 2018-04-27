<template>
<main id="app" class="main__login">
  <keep-alive>
    <app-notifications></app-notifications>
  </keep-alive>
  <div class="login-box module">
    <div class="row">
      <div class="col-1-of-1">
        <img src="static/logo/itisFermi.svg" class="logo" alt="ITIS Enrico Fermi">
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-1">
        <input type="email" class="module-input-text" placeholder="Email" autocomplete="off" v-model="user.email" @keyup.enter="login">
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-1">
        <input type="password" class="module-input-text" placeholder="Password" autocomplete="off" v-model="user.password" @keyup.enter="login">
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-1">
        <button class="button button--green" @click="login">Entra</button>
      </div>
    </div>
  </div>
<app-footer-light></app-footer-light>
</main>
</template>

<script>

import {
  eventBus
} from '@/main'

import FooterLight from '@/components/footer/light.footer'
import Notifications from '@/components/notifications/notifications'

import axios from 'axios'

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
        let token = (await axios.post('/login/', this.user)).data
        localStorage.setItem('token', token)
        window.location.replace('/')
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

<style lang="scss">

.main__login {
  position: relative;
  width: 100%;
  height: 100%;

  .login-box {
    position: absolute;
    @include absCenter;
    width: 20vw!important;

    @include respond(tab-por) {
      width: 60vw!important;
    }

    @include respond(tab-por) {
      width: 80vw!important;
    }

    .logo {
      width: 50%;

      @include respond(tab-por) {
        width: 40%;
      }
    }

    .error {
      font-size: 1.2rem;
    }

  }
}

</style>
