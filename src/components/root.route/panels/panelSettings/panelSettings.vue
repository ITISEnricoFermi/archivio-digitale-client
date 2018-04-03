<template>
<main class="panel panel__settings">
  <div class="module">
    <div class="row">
      <div class="col-1-of-3">
        <input type="text" class="module-input-text" placeholder="Nome" autocomplete="off" v-model="local.firstname">
      </div>
      <div class="col-1-of-3">
        <input type="text" class="module-input-text" placeholder="Cognome" autocomplete="off" v-model="local.lastname">
      </div>
      <div class="col-1-of-3">
        <input type="text" class="module-input-text" placeholder="Email" autocomplete="off" v-model="local.email">
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-2">
        <input type="password" class="module-input-text" placeholder="Password attuale" autocomplete="off" v-model="local.passwords.old">
      </div>
      <div class="col-1-of-2">
        <input type="password" class="module-input-text" placeholder="Nuova password" autocomplete="off" v-model="local.passwords.new">
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-2">
        <input type="file" class="module-input-file" id="upload-img-profile" @change="uploadProfilePic" ref="settingsProfilePic">
        <label class="button button--blue" for="upload-img-profile"><span><i class="fas fa-upload"></i></span>Carica foto profilo</label>
      </div>
      <div class="col-1-of-2">
        <button class="button button--green" @click="saveSettings"><span><i class="fas fa-save"></i></span>Salva impostazioni</button>
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-1">
        <button class="button button--red" @click="disableAccount"><span><i class="fas fa-trash-alt"></i></span>Elimina account</button>
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-1">
        <p class="module__info">
          <span>L'account verrà disattivato. Puoi riattivarlo in qualunque momento contattando l'amministratore.</span>
          <br/><span>Le tue pubblicazioni rimarranno sulla piattaforma.</span>
        </p>
      </div>
    </div>
  </div>
  <transition name="fade">
    <app-alert v-if="settingsAlert.messages" :alert="settingsAlert" @alert="settingsAlert = $event"></app-alert>
  </transition>
</main>
</template>

<script>
import Alert from '@/components/alert/alert'

import axios from 'axios'

export default {
  name: 'panelSettings',
  props: ['user'],
  data: () => {
    return {
      local: {
        firstname: undefined,
        lastname: undefined,
        email: undefined,
        passwords: {
          new: '',
          old: ''
        }
      },
      profilePic: '',
      settingsAlert: {
        messages: undefined,
        color: undefined
      }
    }
  },
  created () {
    this.local.firstname = this.user.firstname
    this.local.lastname = this.user.lastname
    this.local.email = this.user.email
  },
  methods: {
    saveSettings () {
      axios.patch('/users/me/', {
        user: this.local
      })
        .then(() => {
          window.location.replace('/login')
        })
        .catch((e) => {
          this.settingsAlert = {
            messages: e.response.data.messages,
            color: 'alert--red'
          }
        })
    },
    uploadProfilePic () {
      let profilePic = this.$refs.settingsProfilePic.files[0]

      let formData = new FormData()

      formData.append('picToUpload', profilePic)

      axios.patch('/users/me/pic/', formData)
        .then((message) => {
          window.location.reload()
        })
        .catch((e) => {
          this.settingsAlert = {
            messages: e.response.data.messages,
            color: 'alert--red'
          }
        })
    },
    disableAccount () {
      axios.delete('/users/me/')
        .then(() => {
          window.location.replace('/')
        })
        .catch((e) => {
          this.settingsAlert = {
            messages: e.response.data.messages,
            color: 'alert--red'
          }
        })
    }
  },
  components: {
    appAlert: Alert
  }
}
</script>

<style scoped lang="scss">
</style>
