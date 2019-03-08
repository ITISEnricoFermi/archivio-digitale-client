<template>
<main class="panel">
  <div class="content">
    <app-header @action="action = $event"></app-header>
    <app-documents @document="document = $event" :action="action"></app-documents>
    <app-view :document="document"></app-view>
  </div>
</main>
</template>

<script>
import Documents from './components/documents.section'
import Header from './components/header'
import View from './components/view'

export default {
  name: 'dashboard',
  props: ['user'],
  data () {
    return {
      document: undefined,
      action: 'refresh'
    }
  },
  components: {
    appDocuments: Documents,
    appHeader: Header,
    appView: View
  }
}
</script>

<style scoped lang="scss">

.panel {
    padding: 0!important;
}

.content {
    width: 100%;
    height: 100%;
    position: relative;

    .documents {
        width: 60%;
        margin-top: calc(6rem + 7rem);
        // z-index: 100;
        //
        // @include respond (tab-por) {
        //   width: 100%;
        // }
        //
        // .module {
        //     margin: 0;
        // }
    }

    .header {
      width: 60%;
      height: 7rem;
      top: 6rem;
      z-index: 1500;
      position: fixed;

      @include respond (tab-por) {
        width: 100%;
      }

    }

    .view {
      width: 40%;
      z-index: 1500;
      position: fixed;
      right: 0;
      top: 6rem;
      height: 100%;

      @include respond (tab-por) {
        display: none;
      }

    }

}
</style>
