<template>
<main>
  <div class="module module--padded">
    <div class="row">
      <div class="col-1-of-2">
        <input type="text" class="textfield" placeholder="Collezione" v-model="collection.documentCollection" @keyup.enter="createCollection" />
        <moon-loader :loading="true" :color="'#000'" :size="'20px'" v-if="loading"></moon-loader>
      </div>
      <div class="col-1-of-2">
        <select class="select" v-model="collection.permissions">
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
        <button class="button button--green" @click="createCollection">
          <span class="icon">
            <i class="fas fa-edit"></i>
          </span>
          <span class="crop">Crea collezione</span>
        </button>
      </div>
    </div>
  </div>
</main>
</template>

<script>
import MultipleSelect from '@/components/multipleSelect/multipleSelect'
import MultipleSelectResults from '@/components/multipleSelect/multipleSelectResults'

import MoonLoader from 'vue-spinner/src/MoonLoader.vue'

import eventBus from '@/utils/eventBus'
import v1 from '@/utils/v1'

export default {
  props: ['collectionsPermissions'],
  data () {
    return {
      collection: {
        documentCollection: undefined,
        permissions: undefined,
        authorizations: []
      },
      loading: false
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
    async createCollection () {
      this.loading = true // Parte il caricamento

      try {
        const {
          data: {
            messages
          }
        } = await v1.post('/collections/', this.collection)
        this.loading = false // Il caricamento è terminato
        this.collection.documentCollection = undefined
        this.collection.permissions = undefined
        this.collection.authorizations = []

        eventBus.notification({
          title: messages[0],
          temporary: true
        })
      } catch (e) {
        this.loading = false

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
    MoonLoader: MoonLoader
  }
}
</script>

<style scoped lang="scss">
</style>
