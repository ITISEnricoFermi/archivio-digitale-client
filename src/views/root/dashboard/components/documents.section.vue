<template>
<div class="documents">
  <app-document :document="document" v-for="(document, index) in documents" :key="index" @click="select(document)"></app-document>
  <!-- <div class="module module--padded" v-if="!documents.length">
    <p>Non sono presenti documenti nell'archivio.</p>
  </div> -->
  <div class="module module--padded documents__error" v-if="response || !documents.length">
    <p>{{ responseMessage }}</p>
  </div>
</div>
</template>

<script>
import eventBus from '@/utils/eventBus'
import v1 from '@/utils/v1'

import Document from '@/components/document/document'

export default {
  props: ['action'],
  data () {
    return {
      documents: [],
      response: false,
      responseMessage: '',
      newDocuments: false,
      page: 1
    }
  },
  async created () {
    this.documents = await this.getDocuments(this.page)

    if (this.documents) {
      this.$emit('document', this.documents[0])
    }
    // eventBus.$on('documentDeleted', async () => {
    //   this.documents = await this.getDocuments()
    // })
  },
  watch: {
    async action (value) {
      if (value === 'refresh') {
        this.page = 1
        const news = await this.getDocuments(this.page)
        this.documents = news
      } else if (value === 'loadmore') {
        this.page++
        const news = await this.getDocuments(this.page)

        if (news) {
          this.documents = [...this.documents, ...news]

          const documents = document.getElementsByClassName('documents')[0]

          return window.scrollTo({
            top: documents.offsetHeight,
            behavior: 'smooth'
          })
        }
      }
    }
  },
  methods: {
    async getDocuments (page) {
      try {
        const response = await v1.get(`/documents/recent/${page}/5`)
        this.newDocuments = true
        return response.data
      } catch (e) {
        this.newDocuments = false
        this.response = true
        this.responseMessage = e.response.data.messages[0]
      }
    },
    editDocument (id) {
      eventBus.openPopUp('editDocument', id, 'appEditDocument', 80)
    },
    select (document) {
      this.$emit('document', document)
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
    grid-gap: 2rem;
    padding: 2rem;
    grid-template-columns: 1fr;

    @include respond(tab-lan) {
        padding-right: 0!important;
        padding-left: 0!important;
    }

    .document {
        cursor: pointer;

        &:hover {
            background-color: #f3f5f2;

            @include color-scheme(dark) {
                background-color: rgba(white, 0.2);
            }
        }

    }
}
</style>
