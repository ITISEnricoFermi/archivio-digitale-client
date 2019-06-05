<template>
<main>
  <app-header></app-header>
  <div class="content">
    <app-search-documents @searchDocuments="documents = $event" @alert="documentsAlert = $event"></app-search-documents>
    <transition name="fade">
      <app-alert v-if="documentsAlert.messages" :alert="documentsAlert" @alert="documentsAlert = $event"></app-alert>
    </transition>
    <transition-group name="fade">
      <app-document v-for="document in documents" :key="document._id" :document="document"></app-document>
    </transition-group>
  </div>
</main>
</template>

<script>
import Document from '@/components/document/document'
import SearchDocuments from './components/documents.search'
import Alert from '@/components/alert/alert'
import Header from '@/routes/home.route/components/header'

export default {
  name: 'search',
  data () {
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
    appAlert: Alert,
    appHeader: Header
  }
}
</script>

<style scoped lang="scss">
main {
    font-size: $font-default-2;

    .header {
        background-image: linear-gradient(45deg, #1A8D4C 1%, lighten(#1A8D4C, 10%) 64%, #66BA6B 97%);
    }

    .content {
      padding: 3vh;
    }
}
</style>
