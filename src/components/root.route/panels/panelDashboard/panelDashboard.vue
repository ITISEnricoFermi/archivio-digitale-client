<template>
<main class="panel panel__dashboard">
  <div class="panel__dashboard-box">
    <app-recent-posts></app-recent-posts>
  </div>
</main>
</template>

<script>
import RecentPosts from './recentPosts.vue'
import Profile from './profile.vue'
import Chart from './chart.vue'

export default {
  name: 'panelDashboard',
  props: ['user'],
  components: {
    appRecentPosts: RecentPosts,
    appProfile: Profile,
    appChart: Chart
  }
}
</script>

<style scoped lang="scss">
.panel__dashboard {
    &-box {
        width: 100%;
        height: 100%;
        // @include respond(tab-por) {
        //     grid-template-rows: auto auto auto;
        //     grid-template-columns: 1fr;
        //     grid-template-areas: "recentPosts" "profile" "chart";
        // }

        .module {
            margin: 0 auto!important;
        }

    }

    // &--recent-posts {
    //     grid-area: recentPosts;
    //     display: grid;
    //     grid-template-columns: 1fr;
    // }
    //
    // &--chart {
    //     grid-area: chart;
    // }
}
</style>
