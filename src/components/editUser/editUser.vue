<template>
<div class="editUser">
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
  <div class="row">
    <div class="col-1-of-1">
      <app-multiple-select :placeholder="'Visibilità'" :multipleSelectOutput="userToEdit.accesses" :multipleSelectData="subjects" :dbElements="dbElements" @elementAdded="userToEdit.accesses = $event"></app-multiple-select>
    </div>
  </div>
  <div class="row" v-if="userToEdit.accesses.length !== 0">
    <div class="col-1-of-1">
      <app-multiple-select-results :multipleSelectOutput="userToEdit.accesses" :dbElements="dbElements" @elementRemoved="userToEdit.accesses = $event"></app-multiple-select-results>
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
      <button class="button button--red" @click="disable(id)">
          <span><i class="fas fa-trash-alt"></i></span>
          <span>Disattiva utente</span>
        </button>
    </div>
    <div class="col-1-of-4">
      <button class="button button--blue" @click="reset(id)">
          <span><i class="fas fa-key"></i></span>
          <span>Reimposta password</span>
        </button>
    </div>
    <div class="col-1-of-4">
      <button class="button button--green" @click="edit(id)">
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
import multipleSelectResults from '@/components/multipleSelect/multipleSelectResults'

import axios from 'axios'

export default {
  name: 'editUser',
  props: ['id', 'privileges', 'subjects'],
  data: () => {
    return {
      dbElements: ['subject'],
      userToEdit: {
        firstname: undefined,
        lastname: undefined,
        email: undefined,
        privileges: undefined,
        accesses: []
      },
      response: false,
      responseMessage: ''
    }
  },
  created () {
    console.log(this.id, this.privileges, this.subjects)
    axios.get('/admin/users/' + this.id)
      .then((response) => {
        let {firstname, lastname, email, privileges, accesses} = response.data
        this.userToEdit = {
          firstname,
          lastname,
          email,
          privileges: privileges._id,
          accesses
        }
      })
      .catch((e) => {
        this.response = true
        this.responseMessage = e.response.data
      })
  },
  sockets: {
    userUpdated (user) {
      if (user._id === this.userToEdit._id) {
        this.userToEdit = user
      }
    }
  },
  methods: {
    closePopUp () {
      eventBus.closePopUp()
    },
    async reset (id) {

    },
    async edit (id) {
      try {
        let response = await axios.patch('/admin/users/' + id, {
          user: this.userToEdit
        })

        if (response) {
          eventBus.closePopUp()
          this.$socket.emit('userUpdated', this.userToEdit)
        }
      } catch (e) {
        this.response = true
        this.responseMessage = e.response.data
      }
    },
    disable (id) {
      axios.delete('/documents/' + id)
        .then((response) => {
          eventBus.closePopUp()
          this.$socket.emit('documentDeleted')
        })
        .catch((e) => {
          this.response = true
          this.response = e.response.data
        })
    }
  },
  components: {
    appMultipleSelect: MultipleSelect,
    appMultipleSelectResults: multipleSelectResults
  }
}
</script>

<style scoped lang="scss">

</style>
