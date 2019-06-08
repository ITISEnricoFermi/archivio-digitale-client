<template>
<main class="panel">
  <div class="module module--padded">
    <div class="row section-title">
      <div class="col-1-of-1">
        <label for="email">Email principale</label>
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-1">
        <input type="text" id="email" class="textfield" placeholder="Email" autocomplete="off" v-model="local.email">
      </div>
    </div>
    <div class="row section-title">
      <div class="col-1-of-2">
        <label for="new-password">Nuova password</label>
      </div>
      <div class="col-1-of-2">
        <label for="old-password">Password attuale</label>
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-2">
        <input type="password" id="new-password" class="textfield" placeholder="Password attuale" autocomplete="off" v-model="local.passwords.old">
      </div>
      <div class="col-1-of-2">
        <input type="password" id="old-password" class="textfield" placeholder="Nuova password" autocomplete="new-password" v-model="local.passwords.new">
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-1">
        <button class="button button--green" @click="saveSettings">
          <span class="icon"><i class="fas fa-save"></i></span>
          <span class="crop">Salva <span class="crop">impostazioni</span></span>
        </button>
      </div>
    </div>
  </div>
  <div class="module module--padded">
    <div class="row">
      <div class="col-1-of-1">
        <app-file-loader @file="uploadProfilePic($event)" :file="file" dragMessage="Trascina una foto per impostare l'avatar." dropMessage="Rilascia la foto."></app-file-loader>
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
  </div>
</main>
</template>

<script>
import FileLoader from '@/components/fileLoader/fileLoader'

import v1 from '@/utils/v1'
import eventBus from '@/utils/eventBus'

export default {
  props: ['user'],
  data () {
    return {
      local: {
        email: undefined,
        passwords: {
          new: '',
          old: ''
        }
      },
      profilePic: '',
      file: undefined
    }
  },
  created () {
    this.local.email = this.user.email
  },
  methods: {
    async uploadProfilePic (pic) {
      const formData = new FormData()

      formData.append('file', pic)

      try {
        await v1.patch('/users/' + localStorage.getItem('id') + '/pic/', formData)
        window.location.reload()
      } catch ({ response: { data: { messages: [title] } } }) {
        eventBus.notification({
          title,
          temporary: true
        })
      }
    },
    async saveSettings () {
      try {
        await v1.patch('/users/' + localStorage.getItem('id'), this.local)
        window.location.replace('/login')
      } catch ({ response: { data: { messages: [title] } } }) {
        eventBus.notification({
          title,
          temporary: true
        })
      }
    },
    async disableAccount () {
      try {
        await v1.delete('/users/' + localStorage.getItem('id'))
        window.location.replace('/')
      } catch ({ response: { data: { messages: [title] } } }) {
        eventBus.notification({
          title,
          temporary: true
        })
      }
    }
  },
  components: {
    appFileLoader: FileLoader
  }
}
</script>

<style scoped lang="scss">
.panel {
    padding: 3vh;
}

.section-title {
    font-size: $font-default-2;
    font-weight: bold;
    text-align: left;
    margin-bottom: $gutter-vertical-1!important;
}
</style>
