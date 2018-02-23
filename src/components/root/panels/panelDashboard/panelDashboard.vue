<template>
<div class="panel panel__dashboard" id="panel-dashboard">
  <div class="panel__dashboard-box">
    <app-recent-posts></app-recent-posts>
    <app-profile :user="user"></app-profile>
    <app-top-profiles></app-top-profiles>
  </div>
</div>
</template>

<script>
import RecentPosts from "./recentPosts.vue";
import Profile from "./profile.vue";
import TopProfiles from "./topProfiles.vue";

export default {
  props: ["user"],
  components: {
    appRecentPosts: RecentPosts,
    appProfile: Profile,
    appTopProfiles: TopProfiles
  }
}
</script>

<style scoped lang="scss">

</style>
