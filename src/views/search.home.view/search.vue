<template>
  <main>
    <app-search-documents @searchDocuments="documents = $event" @alert="documentsAlert = $event"></app-search-documents>
    <transition name="fade">
      <app-alert v-if="documentsAlert.messages" :alert="documentsAlert" @alert="documentsAlert = $event"></app-alert>
    </transition>
    <transition-group name="fade">
      <app-document v-for="(document, index) in documents" :key="index" :document="document"></app-document>
    </transition-group>
  </main>
</template>

<script>
import Document from '@/components/document/document'
import SearchDocuments from './components/documents.search'
import Alert from '@/components/alert/alert'

export default {
  name: 'search',
  data: () => {
    return {
      documents: [],
      documentsAlert: {
        messages: undefined,
        color: undefined
      }
    }
  },
  components: {
    appDocument: Document,
    appSearchDocuments: SearchDocuments,
    appAlert: Alert
  }
}
</script>

<style scoped lang="scss">
    main {
        padding: 3vh;
        font-size: $font-default-2;
    }
</style>
