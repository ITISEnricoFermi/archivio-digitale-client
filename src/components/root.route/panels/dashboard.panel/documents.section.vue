<template>
<div class="documents">
  <div class="module documents__error" v-if="response">
    <p>{{ responseMessage }}</p>
  </div>
  <app-document :document="document" v-for="(document, index) in recentDocuments" :key="index"></app-document>
</div>
</template>

<script>
import {
  eventBus
} from '@/main'

import Document from '@/components/document/document'

import axios from 'axios'

export default {
  name: 'documents',
  data: () => {
    return {
      recentDocuments: [],
      response: false,
      responseMessage: ''
    }
  },
  created () {
    this.getRecentDocuments()

    eventBus.$on('documentDeleted', () => {
      this.getRecentDocuments()
    })
  },
  sockets: {
    newDocument () {
      this.getRecentDocuments()
    },
    documentDeleted () {
      this.getRecentDocuments()
    },
    documentUpdated () {
      this.getRecentDocuments()
    }
  },
  methods: {
    getRecentDocuments () {
      return axios.get('/documents/recent/')
        .then((response) => {
          this.recentDocuments = response.data
        })
        .catch((e) => {
          console.log(e)
          this.response = true
          this.responseMessage = e.response.data
        })
    },
    editDocument (id) {
      eventBus.editEntity('editDocument', id, 'appEditDocument')
    }
  },
  components: {
    appDocument: Document
  }
}
</script>

<style scoped lang="scss">
.documents {
    grid-area: documents;
    display: grid;
    grid-template-columns: 1fr;

    &__error:last-child {
        margin-bottom: 0vh!important;
    }

}
</style>
