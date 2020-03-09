<template>
<div class="edit">
  <div class="row row--title">
    <div class="col-1-of-1">
      <p class="section-title">Informazioni</p>
    </div>
  </div>
  <div class="row">
    <div class="col-1-of-2">
      <input type="text" class="textfield" placeholder="Nome" autocomplete="off" required v-model="user.firstname">
    </div>
    <div class="col-1-of-2">
      <input type="text" class="textfield" placeholder="Cognome" autocomplete="off" required v-model="user.lastname">
    </div>
  </div>
  <div class="row">
    <div class="col-1-of-2">
      <input type="email" class="textfield" placeholder="Email" autocomplete="off" required v-model="user.email">
    </div>
    <div class="col-1-of-2">
      <select class="select" v-model="user.privileges" required>
        <option class="module-input-option" value="" disabled>Privilegi</option>
        <option class="module-input-option" :value="privilege._id" v-for="(privilege, index) in privileges" :key="index">
          {{ privilege.privilege }}
        </option>
      </select>
    </div>
  </div>
  <div class="row row--title">
    <div class="col-1-of-1">
      <p class="section-title">Autorizzazioni</p>
    </div>
  </div>
  <div class="row">
    <div class="col-1-of-1">
      <app-multiple-select :placeholder="'Autorizzazioni'" :selected.sync="user.accesses" :dbElements="['subject']" :url="'/subjects/search/partial/'" @update:selected="user.accesses = $event"></app-multiple-select>
    </div>
  </div>
  <div class="row" v-if="user.accesses.length">
    <div class="col-1-of-1">
      <app-multiple-select-results :selected.sync="user.accesses" :dbElements="['subject']" @update:selected="user.accesses = $event"></app-multiple-select-results>
    </div>
  </div>
  <div class="row">
    <div class="col-1-of-4">
      <button class="button button--yellow" @click="closePopUp">
        <span class="icon"><i class="fas fa-ban"></i></span>
        <span class="crop">Annulla</span>
      </button>
    </div>
    <div class="col-1-of-4">
      <button class="button button--red" v-if="user.state === 'active'" @click="toggleState">
        <span class="icon"><i class="fas fa-trash-alt"></i></span>
        <span class="crop">Disattiva utente</span>
      </button>
      <button class="button button--green" v-if="user.state === 'disabled'" @click="toggleState">
        <span class="icon"><i class="fas fa-check-circle"></i></span>
        <span class="crop">Attiva utente</span>
      </button>
    </div>
    <div class="col-1-of-4">
      <button class="button button--blue" @click="reset">
        <span class="icon"><i class="fas fa-key"></i></span>
        <span class="crop">Reimposta password</span>
      </button>
    </div>
    <div class="col-1-of-4">
      <button class="button button--green" @click="edit">
        <span class="icon"><i class="fas fa-save"></i></span>
        <span class="crop">Salva utente</span>
      </button>
    </div>
  </div>
</div>
</template>

<script>
import eventBus from '@/utils/eventBus'
import v1 from '@/utils/v1'

import MultipleSelect from '@/components/multipleSelect/multipleSelect'
import MultipleSelectResults from '@/components/multipleSelect/multipleSelectResults'

export default {
  props: ['entity', 'privileges'],
  data () {
    return {
      user: {
        firstname: '',
        lastname: '',
        email: '',
        state: undefined,
        privileges: undefined,
        accesses: []
      }
    }
  },
  computed: {
    id () {
      return this.entity
    }
  },
  async created () {
    await this.getUser()
  },
  sockets: {
    async userUpdated (user) {
      if (user._id === this.user._id) {
        await this.getUser()
      }
    }
  },
  methods: {
    closePopUp () {
      eventBus.closePopUp()
    },
    async getUser () {
      try {
        const response = await v1.get('/users/' + this.id)
        const {
          firstname,
          lastname,
          email,
          privileges,
          accesses,
          state
        } = response.data

        this.user = {
          firstname,
          lastname,
          email,
          privileges: privileges._id,
          accesses,
          state
        }
      } catch (e) {
        eventBus.notification({
          title: e.response.data.messages[0],
          temporary: true
        })
      }
    },
    async reset () {
      try {
        const response = await v1.patch('/admin/users/' + this.id + '/password/', {
          _id: this.id
        })

        eventBus.notification({
          title: `Password: ${response.data.password}`,
          temporary: false
        })

        // this.closePopUp()
      } catch (e) {
        eventBus.notification({
          title: e.response.data.messages[0],
          temporary: true
        })
      }
    },
    async edit () {
      try {
        await v1.patch('/admin/users/' + this.id, this.user)
        eventBus.notification({
          title: 'Utente modificato con successo.',
          temporary: true
        })
        eventBus.closePopUp()
        this.$socket.emit('userUpdated', this.user)
      } catch (e) {
        eventBus.notification({
          title: e.response.data.messages[0],
          temporary: true
        })
      }
    },
    async toggleState () {
      try {
        const user = await v1.patch('/admin/users/' + this.id + '/state/', {
          state: this.user.state
        })
        eventBus.notification({
          title: 'Stato dell\'account modificato con successo.',
          temporary: true
        })
        this.$socket.emit('userUpdated', user)
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
    appMultipleSelectResults: MultipleSelectResults
  }
}
</script>

<style scoped lang="scss">
.section-title {
    font-size: $font-default-2;
    font-weight: bold;
}

.row--title {
    margin-bottom: $gutter-vertical-1!important;
}
</style>
