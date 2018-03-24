<template>
<main id="app">
  <div class="login-box module">
    <div class="row">
      <div class="col-1-of-1">
        <img src="static/logo/itisFermi.svg" class="logo">
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-1">
        <input type="email" class="module-input-text" placeholder="Email" autocomplete="off" v-model="loginEmail" @keyup.enter="login">
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-1">
        <input type="password" class="module-input-text" placeholder="Password" autocomplete="off" v-model="loginPassword" @keyup.enter="login">
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-1">
        <button class="button button--green" @click="login">Entra</button>
      </div>
    </div>
    <div class="row" v-if="response">
      <div class="col-1-of-1">
        <p class="error">{{responseMessage}}</p>
      </div>
    </div>
  </div>
<app-footer-light></app-footer-light>
</main>
</template>

<script>

import FooterLight from '@/components/footer/light.footer'

import axios from 'axios'

export default {
  name: 'login',
  data: () => {
    return {
      response: false,
      responseMessage: '',
      loginEmail: '',
      loginPassword: ''
    }
  },
  methods: {
    login () {
      let user = {
        email: this.loginEmail,
        password: this.loginPassword
      }

      axios.post('/login', user)
        .then((token) => {
          localStorage.setItem('token', token)
          window.location.replace('/')
        })
        .catch((e) => {
          this.response = true
          this.responseMessage = e.response.data.messages[0]
        })
    }
  },
  components: {
    appFooterLight: FooterLight
  }
}
</script>

<style lang="scss">
body {
  background-color: $color-white-2;
  height: 100%;
}

main {
  position: relative;
  width: 100%;
  height: 100%;
}

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

</style>
