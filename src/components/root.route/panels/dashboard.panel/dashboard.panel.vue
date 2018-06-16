<template>
<main class="panel">
  <div class="content">
    <app-documents></app-documents>
    <app-profile :user="user"></app-profile>
    <app-chart></app-chart>
  </div>
</main>
</template>

<script>
import Documents from './documents.section'
import Profile from './profile.section'
import Chart from './chart.section'

export default {
  name: 'dashboard',
  props: ['user'],
  components: {
    appDocuments: Documents,
    appProfile: Profile,
    appChart: Chart
  }
}
</script>

<style scoped lang="scss">
    .content {
        display: grid;
        grid-template-rows: 1fr 1fr;
        grid-template-columns: 1fr 1fr;
        grid-template-areas: "documents profile" "documents chart";
        grid-gap: 3vh;
        width: 100%;
        height: 100%;

        @include respond(tab-por) {
            grid-template-rows: auto;
            grid-template-columns: 1fr;
            grid-template-areas: "documents";
        }

        .module {
            margin: 0!important !important;
        }

    }
</style>
