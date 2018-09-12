<template>
<div class="documents">
  <app-document :document="document" v-for="(document, index) in documents" :key="index" v-if="documents.length"></app-document>
  <div class="module module--padded" v-else>
    <p>Non sono presenti documenti nell'archivio.</p>
  </div>
  <button class="button" v-if="documents.length && newDocuments === true" @click="loadmore()">Carica altro</button>
  <div class="module module--padded documents__error" v-if="response">
    <p>{{ responseMessage }}</p>
  </div>
</div>
</template>

<script>
import {
  eventBus,
  v1
} from '@/main'

import Document from '@/components/document/document'

export default {
  name: 'documents',
  data: () => {
    return {
      documents: [],
      response: false,
      responseMessage: '',
      page: 1,
      newDocuments: false
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
        const response = await v1.get(`/documents/recent/${this.page}/3`)
        if (response) {
          this.documents = [...this.documents, ...response.data]
          this.newDocuments = true
        }
      } catch (e) {
        console.log(e)
        this.newDocuments = false
        this.response = true
        this.responseMessage = e.response.data.messages[0]
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
