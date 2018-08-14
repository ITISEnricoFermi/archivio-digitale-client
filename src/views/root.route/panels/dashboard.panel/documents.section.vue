<template>
<div class="documents">
  <div class="module module--padded documents__error" v-if="response">
    <p>{{ responseMessage }}</p>
  </div>
  <app-document :document="document" v-for="(document, index) in documents" :key="index" v-if="documents.length"></app-document>
  <button class="button" v-if="documents.length" @click="loadmore()">Carica altro</button>
  <div class="module module--padded" v-else>
    <p>Non sono presenti documenti nell'archivio.</p>
  </div>
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
      documents: [],
      response: false,
      responseMessage: '',
      page: 1
    }
  },
  async created () {
    await this.getDocuments()

    eventBus.$on('documentDeleted', async () => {
      await this.getDocuments()
    })
  },
  sockets: {
    async newDocument () {
      await this.getDocuments()
    },
    async documentDeleted () {
      await this.getDocuments()
    },
    async documentUpdated () {
      await this.getDocuments()
    }
  },
  methods: {
    async getDocuments () {
      try {
        this.documents = [...this.documents, ...(await axios.get(`/documents/recent/${this.page}/3`)).data]
      } catch (e) {
        console.log(e)
        this.response = true
        this.responseMessage = e.response.data
      }
    },
    editDocument (id) {
      eventBus.openPopUp('editDocument', id, 'appEditDocument', 80)
    },
    loadmore () {
      this.page++
      this.getDocuments()
    }
  },
  components: {
    appDocument: Document
  }
}
</script>

<style scoped lang="scss">
.documents {
    display: grid;
    grid-template-columns: 1fr;

    .module:last-child {
      margin-bottom: 0!important;
    }

}
</style>
