<template>
<main class="panel">
  <div class="content">
    <!-- <app-profile :user="user"></app-profile> -->
    <app-header></app-header>
    <app-documents @document="document = $event"></app-documents>
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
      document: undefined
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
    }

    .view {
      width: calc((100vw - 25rem) / 100 * 40);
      z-index: 11111;
      position: fixed;
      right: 0;
      top: 0;
      height: 100vw;
    }

}
</style>
