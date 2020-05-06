<template>
<div class="edit">
  <div class="row row--title">
    <div class="col-1-of-1">
      <p class="section-title">Informazioni</p>
    </div>
  </div>
  <div class="row">
    <div class="col-1-of-1">
      <input type="text" class="textfield" placeholder="Titolo" v-model="collectionToEdit.documentCollection">
    </div>
  </div>
  <div class="row row--title">
    <div class="col-1-of-1">
      <p class="section-title">Autorizzazioni</p>
    </div>
  </div>
  <div class="row">
    <div :class="{'col-1-of-2': toggleMultipleSelect}">
      <select class="select" v-model="collectionToEdit.permissions">
          <option class="module-input-option" value="undefined" disabled selected>Permessi (modifica)</option>
          <option class="module-input-option" :value="permission._id" v-for="(permission, index) in collectionPermissions" :key="index">{{permission.permission}}</option>
      </select>
    </div>
    <div class="col-1-of-2" disabled v-if="toggleMultipleSelect">
      <app-multiple-select :placeholder="'Autorizzazioni'" :selected.sync="collectionToEdit.authorizations" :dbElements="['firstname', 'lastname']" :url="'/users/search/partial/'" @update:selected="collectionToEdit.authorizations = $event"></app-multiple-select>
    </div>
  </div>
  <div class="row" v-if="collectionToEdit.authorizations.length !== 0 && toggleMultipleSelect">
    <div class="col-1-of-1">
      <app-multiple-select-results :selected.sync="collectionToEdit.authorizations" :dbElements="['firstname', 'lastname']" @update:selected="collectionToEdit.authorizations = $event"></app-multiple-select-results>
    </div>
  </div>
  <div class="row row--title">
    <div class="col-1-of-1">
      <p class="section-title">Documenti</p>
    </div>
  </div>
  <!-- <div class="row">
    <div class="col-1-of-1">
      <app-multiple-select :placeholder="'Aggiungi un documento alla collezione'" :selected.sync="collectionToEdit.documents" :dbElements="['name']" :url="'/documents/search/partial/'" @update:selected="collectionToEdit.documents = $event"></app-multiple-select>
    </div>
  </div>
  <div class="row" v-if="this.collectionToEdit.documents.length">
    <div class="col-1-of-1">
      <app-multiple-select-results :selected.sync="collectionToEdit.documents" :dbElements="['name']" @update:selected="collectionToEdit.documents = $event"></app-multiple-select-results>
    </div>
  </div> -->
  <div class="row">
    <div class="col-1-of-1">
      <app-selector @selected="collectionToEdit.documents = $event" :current="collectionToEdit.documents" :dbElements="['name']" endpoint="/documents/search/partial/"></app-selector>
    </div>
  </div>
  <div class="row">
    <div class="col-1-of-3">
      <button class="button button--yellow" @click="closePopUp">
          <span class="icon"><i class="fas fa-ban"></i></span>
          <span class="crop">Annulla</span>
        </button>
    </div>
    <div class="col-1-of-3">
      <button class="button button--red" @click="remove(entity._id)">
          <span class="icon"><i class="fas fa-trash-alt"></i></span>
          <span class="crop">Elimina la collezione</span>
        </button>
    </div>
    <div class="col-1-of-3">
      <button class="button button--green" @click="edit(entity._id)">
          <span class="icon"><i class="fas fa-save"></i></span>
          <span class="crop">Salva collezione</span>
        </button>
    </div>
  </div>
</div>
</template>

<script>
import eventBus from '@/utils/eventBus'
import v1 from '@/utils/v1'
import { mapGetters } from 'vuex'

import MultipleSelect from '@/components/multipleSelect/multipleSelect'
import MultipleSelectResults from '@/components/multipleSelect/multipleSelectResults'
import Selector from '@/components/selector/selector'

export default {
  props: ['entity'],
  data () {
    return {
      collectionToEdit: {
        documentCollection: '',
        permissions: '',
        authorizations: [],
        documents: []
      }
    }
  },
  computed: {
    ...mapGetters({
      collectionPermission: 'getCollectionPermissions'
    }),
    toggleMultipleSelect () {
      if (this.collectionToEdit.permissions === 'utenti') {
        return true
      }
      return false
    }
  },
  async created () {
    this.collectionToEdit = {
      documentCollection: this.entity.documentCollection,
      permissions: this.entity.permissions._id,
      authorizations: this.entity.authorizations,
      documents: this.entity.documents
    }
  },
  // sockets: {
  //   collectionUpdated (collection) {
  //     if (collection._id === this.collectionToEdit._id) {
  //       this.collectionToEdit = collection
  //     }
  //   }
  // },
  methods: {
    closePopUp () {
      eventBus.closePopUp()
    },
    async edit (id) {
      try {
        const response = await v1.patch('/collections/' + id, this.collectionToEdit)
        eventBus.notification({
          title: response.data.messages[0],
          temporary: true
        })
        this.closePopUp()
        this.$socket.emit('collectionUpdated')
      } catch (e) {
        eventBus.notification({
          title: e.response.data,
          temporary: true
        })
      }
    },
    async remove (id) {
      try {
        const response = await v1.delete('/collections/' + id)
        eventBus.notification({
          title: response.data.messages[0],
          temporary: true
        })
        this.closePopUp()
        this.$socket.emit('collectionDeleted')
      } catch (e) {
        eventBus.notification({
          title: e.response.data,
          temporary: true
        })
      }
    }
  },
  components: {
    appMultipleSelect: MultipleSelect,
    appMultipleSelectResults: MultipleSelectResults,
    appSelector: Selector
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
