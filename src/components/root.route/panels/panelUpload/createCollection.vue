<template>
<div class="module">
  <div class="row">
    <div class="col-1-of-2">
      <input type="text" class="module-input-text" placeholder="Collezione" v-model="collection.documentCollection" @keyup.enter="createCollection">
    </div>
    <div class="col-1-of-2">
      <select class="module-input-select" v-model="collection.permissions">
          <option class="module-input-option" value="undefined" disabled selected>Permessi (modifica)</option>
          <option class="module-input-option" v-for="(permission, index) in collectionsPermissions" :key="index" :value="permission._id">{{permission.permission}}</option>
        </select>
    </div>
  </div>
  <div class="row" v-if="toggleMultipleSelect">
    <div class="col-1-of-1">
      <app-multiple-select :placeholder="'Autorizzazioni'" :selected.sync="collection.authorizations" :dbElements="['firstname', 'lastname']" :url="'/users/search/partial/'" @update:selected="collection.authorizations = $event"></app-multiple-select>
    </div>
  </div>
  <div class="row" v-if="collection.authorizations.length !== 0 && toggleMultipleSelect">
    <div class="col-1-of-1">
      <app-multiple-select-results :selected.sync="collection.authorizations" :dbElements="['firstname', 'lastname']" @update:selected="collection.authorizations = $event"></app-multiple-select-results>
    </div>
  </div>
  <div class="row">
    <div class="col-1-of-1">
      <button class="button button--green" @click="createCollection"><span><i class="fas fa-edit"></i></span>Crea collezione</button>
    </div>
  </div>
</div>
</template>

<script>
import MultipleSelect from '@/components/multipleSelect/multipleSelect'
import MultipleSelectResults from '@/components/multipleSelect/multipleSelectResults'

import axios from 'axios'

export default {
  name: 'createCollection',
  props: ['collectionsPermissions'],
  data: () => {
    return {
      collection: {
        documentCollection: undefined,
        permissions: undefined,
        authorizations: []
      }
    }
  },
  computed: {
    toggleMultipleSelect () {
      if (this.collection.permissions === 'utenti') {
        return true
      }
      return false
    }
  },
  methods: {
    createCollection () {
      if (!this.collection.documentCollection) {
        return this.$emit('alert', {
          messages: ['Il campo del nome della collezione è vuoto.'],
          color: 'alert--red'
        })
      }
      axios.put('/collections/', {
        collection: this.collection
      })
        .then((response) => {
          this.collection.documentCollection = undefined
          this.collection.permissions = undefined
          this.collection.authorizations = []

          this.$emit('alert', {
            messages: response.data.messages,
            color: 'alert--blue'
          })
        })
        .catch((e) => {
          this.$emit('alert', {
            messages: e.response.data.messages,
            color: 'alert--red'
          })
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
