<template>
<main class="panel panel__dashboard">
  <div class="panel__dashboard-box">
    <app-recent-posts @editDocument="showPopUp($event)"></app-recent-posts>
    <app-profile :user="user"></app-profile>
    <app-chart></app-chart>
    <transition name="fade">
      <app-popup @closePopUp="popup = false" v-if="popup" :width="'80%'">
        <app-edit-document :id="documentToEdit" :types="types" :faculties="faculties" :visibilities="visibilities" :sections="sections" :schoolClasses="schoolClasses"></app-edit-document>
      </app-popup>
    </transition>
  </div>
</main>
</template>

<script>
import RecentPosts from "./recentPosts.vue";
import Profile from "./profile.vue";
import Chart from "./chart.vue";
import PopUp from "@/components/popup/popup";
import EditDocument from "@/components/editDocument/editDocument";

export default {
  name: "panelDashboard",
  props: ["user", "types", "faculties", "visibilities", "sections", "schoolClasses"],
  data: () => {
    return {
      popup: false,
      documentToEdit: ""
    };
  },
  components: {
    appRecentPosts: RecentPosts,
    appProfile: Profile,
    appPopup: PopUp,
    appEditDocument: EditDocument,
    appChart: Chart
  },
  methods: {
    showPopUp(id) {
      this.popup = true;
      this.documentToEdit = id;
    }
  }
}
</script>

<style scoped lang="scss">
</style>
