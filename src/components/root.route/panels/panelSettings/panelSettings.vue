<template>
<main class="panel panel__settings">
  <div class="module">
    <div class="row">
      <div class="col-1-of-2">
        <input type="password" class="module-input-text" placeholder="Password attuale" autocomplete="off" v-model="passwords.old">
      </div>
      <div class="col-1-of-2">
        <input type="password" class="module-input-text" placeholder="Nuova password" autocomplete="off" v-model="passwords.new">
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-2">
        <input type="file" class="module-input-file" id="upload-img-profile" @change="uploadProfilePic" ref="settingsProfilePic">
        <label class="button button--blue" for="upload-img-profile">Carica foto profilo</label>
      </div>
      <div class="col-1-of-2">
        <button class="button button--green" @click="saveSettings">Salva impostazioni</button>
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-1">
        <button class="button button--red" @click="disableAccount">Elimina account</button>
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
  <div class="module" v-if="response">
    <div class="row">
      <div class="col-1-of-1">
        <p>{{responseMessage}}</p>
      </div>
    </div>
  </div>
  <transition name="fade">
    <app-alert v-if="settingsAlert.message" :alert="settingsAlert" @alert="settingsAlert = $event"></app-alert>
  </transition>
</main>
</template>

<script>
import Alert from '@/components/alert/alert'

import axios from 'axios'

export default {
  name: 'panelSettings',
  data: () => {
    return {
      passwords: {
        new: '',
        old: ''
      },
      profilePic: '',
      settingsAlert: {
        message: undefined,
        color: undefined
      }
    }
  },
  methods: {
    saveSettings () {
      axios.patch('/users/me/', this.passwords)
        .then(() => {
          window.location.replace('/login')
        })
        .catch((e) => {
          this.settingsAlert = {
            message: e.response.data,
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
            message: e.response.data,
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
            message: e.response.data,
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
