<template>
<main class="main">
  <nprogress-container></nprogress-container>
  <app-header :document="document"></app-header>
  <iframe :src="'https://drive.google.com/viewer?url=' + origin + '/static/documents/' + document._id + '&embedded=true'" class="document" v-if="document"></iframe>
</main>
</template>

<script>
import Header from './components/header'
import NprogressContainer from 'vue-nprogress/src/NprogressContainer'

import v1 from '@/utils/v1'

export default {
  data () {
    return {
      document: undefined,
      origin: window.location.origin
    }
  },
  async beforeRouteEnter (to, from, next) {
    const id = to.params.id

    if (!id) return

    try {
      const response = await v1.get(`/documents/${id}`)

      to.meta.title = response.data.name

      next(vm => {
        vm.document = response.data
      })
    } catch (e) {
      next({
        path: '404'
      })
    }
  },
  components: {
    appHeader: Header,
    NprogressContainer
  }
}
</script>

<style scoped lang="scss">
.main {
    display: grid;
    width: 100%;
    max-width: 100vw;
    overflow: hidden;
    min-height: 100vh;
    grid-template-columns: 1fr;
    grid-template-rows: min-content auto;
    grid-template-areas: "header" "document";

    .header {
        grid-area: header;
    }

    .document {
        grid-area: document;
        width: 100vw;
        height: 100%;
        border: none;

        body {
            }

        img {
            width: 100%;
        }
    }

}
</style>
