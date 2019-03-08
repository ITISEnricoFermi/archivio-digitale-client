<template>
<main class="panel">
  <div class="module module--padded">
    <div class="row">
      <div class="col-1-of-1">
        <input type="text" class="textfield" placeholder="Email" autocomplete="off" v-model="local.email">
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-2">
        <input type="password" class="textfield" placeholder="Password attuale" autocomplete="off" v-model="local.passwords.old">
      </div>
      <div class="col-1-of-2">
        <input type="password" class="textfield" placeholder="Nuova password" autocomplete="new-password" v-model="local.passwords.new">
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-2">
        <input type="file" class="file" id="upload-img-profile" @change="uploadProfilePic($event)">
        <label class="button button--blue" for="upload-img-profile">
          <span class="icon"><i class="fas fa-upload"></i></span>
          <span class="crop">Carica foto profilo</span>
        </label>
      </div>
      <div class="col-1-of-2">
        <button class="button button--green" @click="saveSettings">
          <span class="icon"><i class="fas fa-save"></i></span>
          <span class="crop">Salva <span class="crop">impostazioni</span></span>
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-1">
        <button class="button button--red" @click="disableAccount">
          <span class="icon"><i class="fas fa-trash-alt"></i></span>
          <span class="crop">Elimina account</span>
        </button>
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

import v1 from '@/utils/v1'

export default {
  props: ['user'],
  data: () => {
    return {
      local: {
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
    this.local.email = this.user.email
  },
  methods: {
    async saveSettings () {
      try {
        await v1.patch('/users/' + localStorage.getItem('id'), {
          user: this.local
        })
        window.location.replace('/login')
      } catch (e) {
        this.settingsAlert = {
          messages: e.message,
          color: 'alert--red'
        }
      }
    },
    async uploadProfilePic ({ target }) {
      let profilePic = target.files[0]

      let formData = new FormData()

      formData.append('picToUpload', profilePic)

      try {
        await v1.patch('/users/' + localStorage.getItem('id') + '/pic/', formData)
        window.location.reload()
      } catch (e) {
        console.log(e)
        this.settingsAlert = {
          messages: e.response.data.messages,
          color: 'alert--red'
        }
      }
    },
    async disableAccount () {
      try {
        await v1.delete('/users/' + localStorage.getItem('id'))
        window.location.replace('/')
      } catch (e) {
        this.settingsAlert = {
          messages: e.response.data.messages,
          color: 'alert--red'
        }
      }
    }
  },
  components: {
    appAlert: Alert
  }
}
</script>

<style scoped lang="scss">
  .panel {
    padding: 3vh;
  }
</style>
