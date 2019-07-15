<template>
<main>
  <app-header></app-header>
  <section class="sections search-documents">
    <div class="content">
      <app-search-documents @searchDocuments="documents = $event" @alert="documentsAlert = $event"></app-search-documents>
      <transition name="fade">
        <app-alert v-if="documentsAlert.messages" :alert="documentsAlert" @alert="documentsAlert = $event"></app-alert>
      </transition>
      <transition-group name="fade">
        <app-document v-for="(document, index) in documents" :key="index" :document="document"></app-document>
      </transition-group>
    </div>
  </section>
</main>
</template>

<script>
import Document from '@/components/document/document'
import SearchDocuments from './components/documents.search'
import Alert from '@/components/alert/alert'
import Header from '@/routes/home.route/components/header'

export default {
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

    .search-documents {
      min-height: 100vh;
    }

    .content {
      padding: 3vh;
    }

    .module {
      &:not(:last-child) {
        margin-bottom: 3vh;
      }
    }
}
</style>
