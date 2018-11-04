<template>
<main class="panel">
  <div class="content">
    <!-- <app-profile :user="user"></app-profile> -->
    <app-header @loadmore="page = $event"></app-header>
    <app-documents @document="document = $event" :page="page"></app-documents>
    <app-view :document="document"></app-view>
  </div>
</main>
</template>

<script>
import Documents from './components/documents.section'
import Profile from './components/profile.section'
import Header from './components/header'
import View from './components/view'

export default {
  name: 'dashboard',
  props: ['user'],
  data () {
    return {
      document: undefined,
      page: 1
    }
  },
  components: {
    appDocuments: Documents,
    appProfile: Profile,
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
    // display: grid;
    // grid-template-columns: 7fr 3fr;
    // grid-template-rows: 7rem min-content;
    // grid-template-areas: "header view" "documents view";
    // grid-gap: 3vh;
    width: 100%;
    height: 100%;
    position: relative;

    // @include respond(tab-por) {
    //     grid-template-rows: auto;
    //     grid-template-columns: 1fr;
    //     grid-template-areas: "documents";
    // }

    .documents {
        width: calc((100vw - 25rem) / 100 * 60);
        margin-top: 7rem;
        z-index: 100;

        @include respond (tab-lan) {
          width: 100%;
          position: absolute;
          // margin: 0;
        }

        .module {
            margin: 0;
        }
    }

    .header {
      width: calc((100vw - 25rem) / 100 * 60);
      height: 7rem;
      top: 0;
      z-index: 11111;
      position: fixed;

      @include respond (tab-lan) {
        position: absolute;
        width: 100%;
        margin: 0;
        z-index: 110;
      }

    }

    .view {
      width: calc((100vw - 25rem) / 100 * 40);
      z-index: 11111;
      position: fixed;
      right: 0;
      top: 0;
      height: 100vh;

      @include respond (tab-lan) {
        // display: none;
        width: 100%;
        height: calc(100vh - 6rem);
        top: 6rem;
        display: none;
      }

    }

}
</style>
