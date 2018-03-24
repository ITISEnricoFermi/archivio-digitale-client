<template>
<main class="panel panel__search">
  <app-search-documents :types="types" :faculties="faculties" :visibilities="visibilities" :sections="sections" :schoolClasses="schoolClasses" @searchDocuments="documents = $event" @alert="documentsAlert = $event"></app-search-documents>
  <app-document :document="document" v-for="document in documents" :key="document._id"></app-document>
  <transition name="fade">
    <app-alert v-if="documentsAlert.messages" :alert="documentsAlert" @alert="documentsAlert = $event"></app-alert>
  </transition>
  <app-search-collections :collectionsPermissions="collectionsPermissions" @searchCollections="collections  = $event" @alert="collectionsAlert = $event"></app-search-collections>
  <app-collection :collection="collection" v-for="collection in collections" :key="collection._id"></app-collection>
  <transition name="fade">
    <app-alert v-if="collectionsAlert.messages" :alert="collectionsAlert" @alert="collectionsAlert = $event"></app-alert>
  </transition>
</main>
</template>

<script>
import searchDocuments from './searchDocuments'
import searchCollections from './searchCollections'
import Document from '@/components/document/document'
import Collection from '@/components/collection/collection'
import Alert from '@/components/alert/alert'

export default {
  props: ['types', 'faculties', 'visibilities', 'sections', 'schoolClasses', 'collectionsPermissions'],
  data: () => {
    return {
      documents: undefined,
      collections: undefined,
      documentsAlert: {
        messages: undefined,
        color: undefined
      },
      collectionsAlert: {
        messages: undefined,
        color: undefined
      }
    }
  },
  components: {
    appSearchDocuments: searchDocuments,
    appSearchCollections: searchCollections,
    appDocument: Document,
    appCollection: Collection,
    appAlert: Alert
  }
}
</script>

<style lang="scss">
</style>
