<template>
<main class="panel">
  <div class="content">
    <app-profile :user="user"></app-profile>
    <app-documents></app-documents>
  </div>
</main>
</template>

<script>
import Documents from './documents.section'
import Profile from './profile.section'

export default {
  name: 'dashboard',
  props: ['user'],
  components: {
    appDocuments: Documents,
    appProfile: Profile
  }
}
</script>

<style scoped lang="scss">
.content {
    display: grid;
    grid-template-columns: 7fr 3fr;
    grid-template-rows: 15rem min-content;
    grid-template-areas: "profile aside" "documents aside";
    grid-gap: 3vh;
    width: 100%;
    height: 100%;

    // @include respond(tab-por) {
    //     grid-template-rows: auto;
    //     grid-template-columns: 1fr;
    //     grid-template-areas: "documents";
    // }

    .documents {
        grid-area: documents;
    }

    .module {
        margin: 0!important !important;
    }

}
</style>
