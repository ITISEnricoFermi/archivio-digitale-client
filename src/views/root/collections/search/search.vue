<template>
<main>
  <div class="module module--padded">
    <div class="row">
      <div class="col-1-of-2">
        <input type="text" class="textfield" placeholder="Cerca una collezione" v-model="query.fulltext" @keyup.enter="search">
        <moon-loader :loading="true" :color="'#000'" :size="'20px'" v-if="loading"></moon-loader>
      </div>
      <div class="col-1-of-2">
        <select class="select" v-model="query.permissions">
              <option class="module-input-option" value="" selected>Permessi (modifica)</option>
              <option class="module-input-option" :value="permission._id" v-for="(permission, index) in collectionPermissions" :key="index">{{ permission.permission }}</option>
          </select>
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-1">
        <button class="button button--green" @click="search">
          <span class="icon"><i class="fas fa-search"></i></span>
          <span class="crop">Cerca</span>
      </button>
      </div>
    </div>
  </div>
  <transition name="fade">
    <app-alert v-if="collectionsAlert.messages" :alert="collectionsAlert" @alert="collectionsAlert = $event"></app-alert>
  </transition>
  <transition-group name="fade">
    <app-collection :collection="collection" v-for="collection in collections" :key="collection._id"></app-collection>
  </transition-group>
</main>
</template>

<script>
import v1 from '@/utils/v1'

import MoonLoader from 'vue-spinner/src/MoonLoader.vue'
import Collection from '@/components/collection/collection'
import Alert from '@/components/alert/alert'

export default {
  props: ['collectionPermissions'],
  data () {
    return {
      query: {
        fulltext: '',
        permissions: ''
      },
      loading: false,
      collections: undefined,
      collectionsAlert: {
        messages: undefined,
        color: undefined
      }
    }
  },
  sockets: {
    collectionDeleted () {
      this.search()
    },
    collectionUpdated () {
      this.search()
    }
  },
  methods: {
    async search () {
      this.loading = true
      try {
        const response = await v1.post('/collections/search/', this.query)
        this.loading = false
        this.collections = response.data
      } catch (e) {
        this.loading = false
        this.collections = []
        this.collectionsAlert = {
          messages: e.response.data.messages,
          color: 'alert--yellow'
        }
      }
    }
  },
  components: {
    MoonLoader: MoonLoader,
    appCollection: Collection,
    appAlert: Alert
  }
}
</script>

<style scoped lang="scss">
.module {
  &:not(:last-child) {
    margin-bottom: 3vh;
  }
}
</style>
