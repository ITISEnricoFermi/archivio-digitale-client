<template>
<div class="editCollection">
  <div class="row">
    <div class="col-1-of-2">
      <input type="text" class="module-input-text" placeholder="Titolo" v-model="collectionToEdit.documentCollection">
    </div>
    <div class="col-1-of-2">
      <select class="module-input-select" v-model="collectionToEdit.permissions">
          <option class="module-input-option" value="undefined" disabled selected>Permessi (modifica)</option>
          <option class="module-input-option" :value="permission._id" v-for="(permission, index) in collectionsPermissions" :key="index">{{permission.permission}}</option>
        </select>
    </div>
  </div>
  <div class="row" v-if="toggleMultipleSelect">
    <div class="col-1-of-1">
      <app-multiple-select :placeholder="'Autorizzazioni'" :multipleSelectOutput="collectionToEdit.authorizations" :multipleSelectData="users" :dbElements="dbElements" @elementAdded="collectionToEdit.authorizations = $event"></app-multiple-select>
    </div>
  </div>
  <div class="row" v-if="collectionToEdit.authorizations.length !== 0 && toggleMultipleSelect">
    <div class="col-1-of-1">
      <app-multiple-select-results :multipleSelectOutput="collectionToEdit.authorizations" :dbElements="dbElements" @elementRemoved="collectionToEdit.authorizations = $event"></app-multiple-select-results>
    </div>
  </div>
  <div class="row">
    <div class="col-1-of-3">
      <button class="button button--yellow" @click="closePopUp">
          <span><i class="fas fa-ban"></i></span>
          <span>Annulla</span>
        </button>
    </div>
    <div class="col-1-of-3">
      <button class="button button--red" @click="remove(id)">
          <span><i class="fas fa-trash-alt"></i></span>
          <span>Elimina la collezione</span>
        </button>
    </div>
    <div class="col-1-of-3">
      <button class="button button--green" @click="edit(id)">
          <span><i class="fas fa-save"></i></span>
          <span>Salva collezione</span>
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
  name: 'editCollection',
  props: ['id', 'collectionsPermissions'],
  data: () => {
    return {
      collectionToEdit: {
        documentCollection: undefined,
        permissions: undefined,
        authorizations: [],
        documents: []
      },
      users: [],
      dbElements: ['firstname', 'lastname']
    }
  },
  computed: {
    toggleMultipleSelect () {
      if (this.collectionToEdit.permissions === 'utenti') {
        return true
      }
      return false
    }
  },
  created () {
    axios.get('/api/getUsers/')
      .then((response) => {
        this.users = response.data
      })
      .catch((e) => {
        this.response = true
        this.responseMessage = e.response.data
      })

    axios.get('/collections/info/' + this.id)
      .then((response) => {
        let collection = response.data

        this.collectionToEdit = {
          documentCollection: collection.documentCollection,
          permissions: collection.permissions._id,
          authorizations: collection.authorizations,
          documents: collection.documents
        }
      })
      .catch((e) => {
        this.response = true
        this.responseMessage = e.response.data
      })
  },
  methods: {
    closePopUp () {
      eventBus.closePopUp()
    },
    edit (id) {

    },
    remove (id) {
      axios.delete('/collections/' + id)
        .then((response) => {
          this.closePopUp()
          this.socket.$emit('collectionDeleted')
        })
        .catch((e) => {
          console.log(e)
          this.response = true
          this.responseMessage = e.respose.data
        })
    }
  },
  components: {
    appMultipleSelect: MultipleSelect,
    appMultipleSelectResults: MultipleSelectResults
  }
}
</script>

<style scoped lang="scss">

</style>
