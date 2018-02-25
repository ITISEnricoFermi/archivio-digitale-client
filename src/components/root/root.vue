<template>
<div id="app">
  <app-menu-header @changeMenu="menu = !menu"></app-menu-header>
  <keep-alive>
    <app-menu @panelChanged="panel = $event" :privileges="user.privileges"></app-menu>
  </keep-alive>
  <transition name="expand">
    <keep-alive>
      <app-menu-mobile @panelChanged="menuMobile($event)" v-if="menu" :privileges="user.privileges"></app-menu-mobile>
    </keep-alive>
  </transition>
  <main>
    <transition name="panel">
      <keep-alive>
        <component :is="panel" :types="types" :faculties="faculties" :visibilities="visibilities" :sections="sections" :schoolClasses="schoolClasses" :privileges="privileges" :user="user" :collectionsPermissions="collectionsPermissions">
        </component>
      </keep-alive>
    </transition>
  </main>
</div>
</template>

<script>
import axios from "axios";

// VUE
import Menu from "@/components/menu/menu.vue";
import MenuMobile from "@/components/menu/menuMobile.vue";
import MenuHeader from "@/components/menu/menuHeader.vue";
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
      subjects: [],
      visibilities: [],
      sections: [],
      schoolClasses: [],
      privileges: [],
      collectionsPermissions: [],
      user: {
        privileges: "",
        img: "../static/elements/profile.jpg"
      },
      errors: [],
      menu: false
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

    axios.get("/user/me")
      .then((response) => {
        this.user = response.data;
      })
      .catch((e) => {
        this.response = true;
        this.responseMessage = e.response.data;
      });

  },
  methods: {
    menuMobile(e) {
      this.panel = e;
      this.menu = false;
    }
  },
  components: {
    appMenu: Menu,
    appMenuMobile: MenuMobile,
    appMenuHeader: MenuHeader,
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

.expand-enter-active,
.expand-leave-active {
    transition: all 0.2s;
}

.expand-enter,
.expand-leave-to {
    height: 0;
}
.expand-enter-to,
.expand-leave {
    height: calc(100% - 6rem);
}

.panel-enter-active,
.panel-leave-active {
    transition: all 0.2s;
}

.panel-enter,
.panel-leave-to {
    visibility: hidden;
    opacity: 0;
}
.panel-enter-to,
.panel-leave {
    opacity: 1;
    visibility: visible;
}
</style>
