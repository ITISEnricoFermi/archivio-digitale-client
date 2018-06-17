<template>
<main id="app" class="main__signup">
  <keep-alive>
    <app-notifications></app-notifications>
  </keep-alive>
  <div class="signup-box module" v-if="!signedUp">
    <!-- Nome, Cognome, Email, Password, Materie -->
    <div class="row">
      <div class="col-1-of-1">
        <a href="/home/">
          <img src="/static/logo/itisFermi.svg" class="logo" alt="ITIS Enrico Fermi">
        </a>
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-1">
        <input type="text" class="textfield" placeholder="Nome" autocomplete="off" v-model="user.firstname" @keyup.enter="signup">
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-1">
        <input type="text" class="textfield" placeholder="Cognome" autocomplete="off" v-model="user.lastname" @keyup.enter="signup">
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-1">
        <input type="email" class="textfield" placeholder="Email" autocomplete="off" v-model="user.email" @keyup.enter="signup">
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-1">
        <input type="password" class="textfield" placeholder="Password" autocomplete="off" v-model="user.password" @keyup.enter="signup">
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-1">
        <app-multiple-select :placeholder="'Autorizzazioni'" :selected.sync="user.accesses" :dbElements="['subject']" :url="'/api/subjects/search/partial/'" @update:selected="user.accesses = $event"></app-multiple-select>
      </div>
    </div>
    <div class="row" v-if="user.accesses.length !== 0">
      <div class="col-1-of-1">
        <app-multiple-select-results :selected.sync="user.accesses" :dbElements="['subject']" @update:selected="user.accesses = $event"></app-multiple-select-results>
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-1">
        <button class="button button--green" @click="signup">
          <span>Registrati</span>
        </button>
      </div>
    </div>
  </div>

  <div class="success-box module" v-else>
    <div class="row">
      <div class="col-1-of-1">
        <img src="/static/logo/itisFermi.svg" class="logo" alt="ITIS Enrico Fermi">
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
import {
  eventBus
} from '@/main'

import FooterLight from '@/components/footer/light.footer'
import MultipleSelect from '@/components/multipleSelect/multipleSelect'
import MultipleSelectResults from '@/components/multipleSelect/multipleSelectResults'
import Notifications from '@/components/notifications/notifications'

import axios from 'axios'

export default {
  name: 'signup',
  data: () => {
    return {
      signedUp: false,
      user: {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        accesses: []
      }
    }
  },
  methods: {
    async signup () {
      if (!this.user.firstname && !this.user.lastname && !this.user.email && !this.user.password && !this.user.accesses) {
        return false
      }

      try {
        await axios.put('/signup', this.user)
        this.$socket.emit('newUser')
        this.signedUp = true

        // if (user) {
        //   this.$socket.emit('newUser')
        //   this.signedUp = true
        // }
      } catch (e) {
        eventBus.notification({
          title: e.response.data.messages[0],
          temporary: true
        })
      }
    }
  },
  components: {
    appMultipleSelect: MultipleSelect,
    appMultipleSelectResults: MultipleSelectResults,
    appFooterLight: FooterLight,
    appNotifications: Notifications
  }
}
</script>

<style lang="scss">
.main__signup {
    position: relative;
    width: 100%;
    min-height: 100vh;

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

        .multiple-select-results {
            overflow-y: scroll;
            max-height: 25vh;
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
            font-size: $font-default-3;
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

}
</style>
