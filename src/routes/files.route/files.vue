<template>
  <main class="main">
    <link href="https://fonts.googleapis.com/css?family=Bitter:400,700" rel="stylesheet">
    <app-header :document="document"></app-header>
    <iframe :src="'/public/documents/' + document.directory" class="document" v-if="document"></iframe>
  </main>
</template>

<script>

import Header from './components/header'

import {
  v1
} from '@/main'

export default {
  data () {
    return {
      document: undefined
    }
  },
  async beforeRouteEnter (to, from, next) {
    const id = to.params.id

    if (!id) return

    try {
      const response = await v1.get(`/documents/info/${id}`)

      document.title = response.data.name
      next(vm => vm.document = response.data)
    } catch (e) {
      next({
        path: '404'
      })
    }
  },
  components: {
    appHeader: Header
  }
}
</script>

<style scoped lang="scss">

.main {
  display: grid;
  width: 100vw;
  max-width: 100vw;
  overflow: hidden;
  height: 100vh;
  grid-template-columns: 1fr;
  grid-template-rows: 10rem calc(100vh - 10rem);
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
