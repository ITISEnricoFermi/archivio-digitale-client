<template>
<div id="app" class="main__search">
  <link href="https://fonts.googleapis.com/css?family=Bitter:400,700" rel="stylesheet">
  <app-header></app-header>
  <main>
    <app-search-documents :types="types" :faculties="faculties" :sections="sections" :schoolClasses="schoolClasses" @searchDocuments="documents = $event" @alert="documentsAlert = $event"></app-search-documents>
    <transition name="fade">
      <app-alert v-if="documentsAlert.messages" :alert="documentsAlert" @alert="documentsAlert = $event"></app-alert>
    </transition>
    <transition-group name="fade">
      <app-document v-for="(document, index) in documents" :key="index" :document="document"></app-document>
    </transition-group>
  </main>
</div>
</template>

<script>
import Header from '@/views/home.route/header'
import Document from '@/components/document/document'
import SearchDocuments from './searchDocuments.vue'
import Alert from '@/components/alert/alert'

import {
  api
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
  created () {
    api.get('/document_types/')
      .then((response) => {
        this.types = response.data
      }).catch((e) => {
        this.errors.push(e)
      })

    api.get('/faculties/')
      .then((response) => {
        this.faculties = response.data
      }).catch((e) => {
        this.errors.push(e)
      })

    api.get('/sections/')
      .then((response) => {
        this.sections = response.data
      }).catch((e) => {
        this.errors.push(e)
      })

    api.get('/grades/')
      .then((response) => {
        this.schoolClasses = response.data
      }).catch((e) => {
        this.errors.push(e)
      })
  },
  components: {
    appHeader: Header,
    appDocument: Document,
    appSearchDocuments: SearchDocuments,
    appAlert: Alert
  }
}
</script>

<style lang="scss">
.main__search {
    main {
        padding: 3vh;
        font-size: $font-default-2;
    }
}
</style>
