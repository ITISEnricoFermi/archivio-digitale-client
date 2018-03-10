<template>
<main class="panel panel__dashboard">
  <div class="panel__dashboard-box">
    <app-recent-posts></app-recent-posts>
    <app-profile :user="user"></app-profile>
    <app-chart></app-chart>
  </div>
</main>
</template>

<script>
import RecentPosts from "./recentPosts.vue";
import Profile from "./profile.vue";
import Chart from "./chart.vue";

export default {
  name: "panelDashboard",
  props: ["user"],
  components: {
    appRecentPosts: RecentPosts,
    appProfile: Profile,
    appChart: Chart
  }
}
</script>

<style scoped lang="scss">
</style>
