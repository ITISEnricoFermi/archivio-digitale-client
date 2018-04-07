<template>
<div class="editUser">
  <div class="row row--title">
    <div class="col-1-of-1">
      <p class="section-title">Informazioni</p>
    </div>
  </div>
  <div class="row">
    <div class="col-1-of-2">
      <input type="text" class="module-input-text" placeholder="Nome" autocomplete="off" required v-model="userToEdit.firstname">
    </div>
    <div class="col-1-of-2">
      <input type="text" class="module-input-text" placeholder="Cognome" autocomplete="off" required v-model="userToEdit.lastname">
    </div>
  </div>
  <div class="row">
    <div class="col-1-of-2">
      <input type="email" class="module-input-text" placeholder="Email" autocomplete="off" required v-model="userToEdit.email">
    </div>
    <div class="col-1-of-2">
      <select class="module-input-select" v-model="userToEdit.privileges" required>
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
      <app-multiple-select :placeholder="'Autorizzazioni'" :selected.sync="userToEdit.accesses" :dbElements="['subject']" :url="'/api/subjects/search/partial/'" @update:selected="userToEdit.accesses = $event"></app-multiple-select>
    </div>
  </div>
  <div class="row" v-if="userToEdit.accesses">
    <div class="col-1-of-1">
      <app-multiple-select-results :selected.sync="userToEdit.accesses" :dbElements="['subject']" @update:selected="userToEdit.accesses = $event"></app-multiple-select-results>
    </div>
  </div>
  <div class="row">
    <div class="col-1-of-4">
      <button class="button button--yellow" @click="closePopUp">
          <span><i class="fas fa-ban"></i></span>
          <span>Annulla</span>
        </button>
    </div>
    <div class="col-1-of-4">
      <button class="button button--red" v-if="userToEdit.state === 'active'" @click="toggleState">
          <span><i class="fas fa-trash-alt"></i></span>
          <span>Disattiva utente</span>
      </button>
      <button class="button button--green" v-if="userToEdit.state === 'disabled'" @click="toggleState">
          <span><i class="fas fa-check-circle"></i></span>
          <span>Attiva utente</span>
      </button>
    </div>
    <div class="col-1-of-4">
      <button class="button button--blue" @click="reset">
          <span><i class="fas fa-key"></i></span>
          <span>Reimposta password</span>
        </button>
    </div>
    <div class="col-1-of-4">
      <button class="button button--green" @click="edit">
          <span><i class="fas fa-save"></i></span>
          <span>Salva utente</span>
        </button>
    </div>
  </div>
</div>
</template>

<script>
import {
  eventBus
} from '@/main'

import MultipleSelect from '@/components/multipleSelect/multipleSelect'
import MultipleSelectResults from '@/components/multipleSelect/multipleSelectResults'

import axios from 'axios'

export default {
  name: 'editUser',
  props: ['id', 'privileges'],
  data: () => {
    return {
      userToEdit: {
        firstname: undefined,
        lastname: undefined,
        email: undefined,
        state: undefined,
        privileges: undefined,
        accesses: []
      }
    }
  },
  created () {
    this.getUser()
  },
  sockets: {
    userUpdated (user) {
      if (user._id === this.userToEdit._id) {
        this.getUser()
      }
    }
  },
  methods: {
    closePopUp () {
      eventBus.closePopUp()
    },
    async getUser () {
      try {
        let {firstname, lastname, email, privileges, accesses, state} = (await axios.get('/admin/users/' + this.id)).data
        this.userToEdit = {
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
        let response = await axios.post('/admin/resetPassword/', {
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
        await axios.patch('/admin/users/' + this.id, {
          user: this.userToEdit
        })
        eventBus.notification({
          title: 'Utente modificato con successo.',
          temporary: true
        })
        eventBus.closePopUp()
        this.$socket.emit('userUpdated', this.userToEdit)
      } catch (e) {
        eventBus.notification({
          title: e.response.data.messages[0],
          temporary: true
        })
      }
    },
    async toggleState () {
      try {
        let user = await axios.post('/admin/toggleState/', {
          _id: this.id,
          state: this.userToEdit.state
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
