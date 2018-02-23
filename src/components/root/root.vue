<template>
<div id="app">
  <app-menu @panelChanged="panel = $event"></app-menu>
  <main>
    <keep-alive>
      <component :is="panel" :types="types" :faculties="faculties" :visibilities="visibilities" :sections="sections" :schoolClasses="schoolClasses" :privileges="privileges" :user="user" :collectionsPermissions="collectionsPermissions">
      </component>
    </keep-alive>
  </main>
</div>
</template>

<script>
import axios from "axios";

// VUE
import Menu from "@/components/menu.vue";
import panelDashboard from "./panels/panelDashboard/panelDashboard.vue";
import panelSearch from "./panels/panelSearch/panelSearch.vue";
import panelUpload from "./panels/panelUpload/panelUpload.vue";
import panelAdmin from "./panels/panelAdmin/panelAdmin.vue";
import panelProfile from "./panels/panelProfile/panelProfile.vue";
import panelSettings from "./panels/panelSettings/panelSettings.vue";

export default {
  name: 'root',
  data: () => {
    return {
      panel: "appPanelDashboard",
      types: [],
      faculties: [],
      visibilities: [],
      sections: [],
      schoolClasses: [],
      privileges: [],
      collectionsPermissions: [],
      user: {},
      errors: []
    };
  },
  created() {
    axios.get("/api/getDocumentTypes/")
      .then((response) => {
        this.types = response.data
      }).catch((e) => {
        this.errors.push(e)
      });

    axios.get("/api/getFaculties/")
      .then((response) => {
        this.faculties = response.data
      }).catch((e) => {
        this.errors.push(e)
      });

    axios.get("/api/getDocumentVisibilityList")
      .then((response) => {
        this.visibilities = response.data
      }).catch((e) => {
        this.errors.push(e)
      });

    axios.get("/api/getSections")
      .then((response) => {
        this.sections = response.data
      }).catch((e) => {
        this.errors.push(e);
      });

    axios.get("/api/getClasses")
      .then((response) => {
        this.schoolClasses = response.data;
      }).catch((e) => {
        this.errors.push(e);
      });

    axios.get("/api/getPrivileges")
      .then((response) => {
        this.privileges = response.data;
      })
      .catch((e) =>  {
        this.response = true;
        this.responseMessage = e.response.data;
      });


    axios.get("/api/getCollectionsPermissions")
      .then((response) => {
        this.collectionsPermissions = response.data;
      })
      .catch((e) => {
        this.response = true;
        this.responseMessage = e.response.data;
      });

    axios.post("/user/me")
      .then((user) => {
        this.user = user.data;
      })
      .catch((e) => {
        this.response = true;
        this.responseMessage = e.response.data;
      });

  },
  components: {
    appMenu: Menu,
    appPanelDashboard: panelDashboard,
    appPanelSearch: panelSearch,
    appPanelUpload: panelUpload,
    appPanelAdmin: panelAdmin,
    appPanelProfile: panelProfile,
    appPanelSettings: panelSettings
  }
}
</script>

<style lang="scss">
@import "./src/scss/main.scss";

#app {
    width: 100vw;
}
</style>
