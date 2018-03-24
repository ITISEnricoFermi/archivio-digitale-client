<template>
<main id="app">

  <div class="signup-box module" v-if="!signedUp">
    <!-- Nome, Cognome, Email, Password, Materie -->
    <div class="row">
      <div class="col-1-of-1">
        <img src="/static/logo/itisFermi.svg" class="logo">
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-1">
        <input type="text" class="module-input-text" placeholder="Nome" autocomplete="off" v-model="user.firstname" @keyup.enter="signup">
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-1">
        <input type="text" class="module-input-text" placeholder="Cognome" autocomplete="off" v-model="user.lastname" @keyup.enter="signup">
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-1">
        <input type="email" class="module-input-text" placeholder="Email" autocomplete="off" v-model="user.email" @keyup.enter="signup">
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-1">
        <input type="password" class="module-input-text" placeholder="Password" autocomplete="off" v-model="user.password" @keyup.enter="signup">
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-1">
        <app-multiple-select :placeholder="'Autorizzazioni'" :multipleSelectData="subjects" :dbElements="dbElements" @elementAdded="user.accesses = $event"></app-multiple-select>
      </div>
    </div>
    <div class="row" v-if="user.accesses.length !== 0">
      <div class="col-1-of-1">
        <app-multiple-select-results :multipleSelectOutput="user.accesses" :dbElements="dbElements" @elementRemoved="user.accesses = $event"></app-multiple-select-results>
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-1">
        <button class="button button--green" @click="signup">Registrati</button>
      </div>
    </div>
    <div class="row" v-if="response">
      <div class="col-1-of-1">
        <p class="error">{{responseMessage}}</p>
      </div>
    </div>
  </div>

  <div class="success-box module" v-else>
    <div class="row">
      <div class="col-1-of-1">
        <img src="/static/logo/itisFermi.svg" class="logo">
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-1">
        <p class="success-box__title">Registrato con successo!</p>
        <p class="success-box__paragraph">L'amministratore dovrà confermare la tua iscrizione.</p>
      </div>
    </div>
  </div>
  <app-footer-light></app-footer-light>
</main>
</template>

<script>
import FooterLight from '@/components/footer/light.footer'
import multipleSelect from '@/components/multipleSelect/multipleSelect.vue'
import multipleSelectResults from '@/components/multipleSelect/multipleSelectResults.vue'

import axios from 'axios'

export default {
  name: 'signup',
  data: () => {
    return {
      signedUp: false,
      response: false,
      responseMessage: '',
      user: {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        accesses: []
      },
      subjects: [],
      dbElements: ['subject']
    }
  },
  created () {
    axios.get('/api/getSubjects')
      .then((response) => {
        this.subjects = response.data
      })
      .catch((e) => {
        this.response = true
        this.responseMessage = e.response.data
      })
  },
  methods: {
    signup () {
      axios.put('/signup', this.user)
        .then((user) => {
          if (user) {
            this.$socket.emit('newUser')
            this.signedUp = true
          }
        })
        .catch((e) => {
          console.log(e)
          this.response = true
          this.responseMessage = e.response.data.messages[0]
        })
    }
  },
  components: {
    appMultipleSelect: multipleSelect,
    appMultipleSelectResults: multipleSelectResults,
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

.signup-box {
    position: absolute;
    @include absCenter;
    width: 20vw!important;

    @include respond(tab-por) {
        width: 60vw!important;
    }

    @include respond(phone) {
        width: 80vw!important;
    }
}

.success-box {
    position: absolute;
    @include absCenter;
    width: 20vw!important;

    @include respond(tab-por) {
        width: 60vw!important;
    }

    @include respond(phone) {
        width: 80vw!important;
    }

    &__title {
        font-weight: bold;
    }

    &__paragraph {
        font-size: $font-default-2;
        margin: 1rem;
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
