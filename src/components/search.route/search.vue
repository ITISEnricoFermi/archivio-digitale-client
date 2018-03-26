<template>
  <div id="app">
    <app-header></app-header>
    <main>
      <app-search-documents :types="types" :faculties="faculties" :sections="sections" :schoolClasses="schoolClasses" @searchDocuments="documents = $event" @alert="documentsAlert = $event"></app-search-documents>
      <transition name="fade">
        <app-alert v-if="documentsAlert.messages" :alert="documentsAlert" @alert="documentsAlert = $event"></app-alert>
      </transition>
      <transition name="fade">
        <app-document v-for="(document, index) in documents" :key="index" :document="document"></app-document>
      </transition>
    </main>
  </div>
</template>

<script>

import Header from '@/components/home.route/header'
import Document from '@/components/document/document'
import SearchDocuments from './searchDocuments.vue'
import Alert from '@/components/alert/alert'

import axios from 'axios'

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
    axios.get('/api/getDocumentTypes/')
      .then((response) => {
        this.types = response.data
      }).catch((e) => {
        this.errors.push(e)
      })

    axios.get('/api/getFaculties/')
      .then((response) => {
        this.faculties = response.data
      }).catch((e) => {
        this.errors.push(e)
      })

    axios.get('/api/getSections')
      .then((response) => {
        this.sections = response.data
      }).catch((e) => {
        this.errors.push(e)
      })

    axios.get('/api/getClasses')
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

body {
  background-color: $color-white-2;

  main {
    padding: 3vh;
    font-size: $font-default-2;
  }

  .header {

    &__bottom {
      display: none;
    }
  }
}
</style>
