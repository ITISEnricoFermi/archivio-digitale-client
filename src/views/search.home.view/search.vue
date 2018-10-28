<template>
  <main>
    <app-search-documents :types="types" :faculties="faculties" :sections="sections" :schoolClasses="schoolClasses" @searchDocuments="documents = $event" @alert="documentsAlert = $event"></app-search-documents>
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

import {
  v1
} from '@/main'

export default {
  name: 'search',
  data: () => {
    return {
      documents: [],
      types: [],
      faculties: [],
      sections: [],
      schoolClasses: [],
      documentsAlert: {
        messages: undefined,
        color: undefined
      }
    }
  },
  async created () {
    let response

    try {
      response = await v1.get('/document_types/')
      this.types = response.data

      response = await v1.get('/faculties/')
      this.faculties = response.data

      response = await v1.get('/sections/')
      this.sections = response.data

      response = await v1.get('/grades/')
      this.schoolClasses = response.data
    } catch (e) {
      console.log(e)
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
