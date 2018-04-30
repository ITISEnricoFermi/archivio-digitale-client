<template>
<div id="app" class="main__root">
  <app-menu-header @changeMenu="menu = !menu"></app-menu-header>
  <keep-alive>
    <app-notifications></app-notifications>
  </keep-alive>
  <keep-alive>
    <app-menu @panelChanged="panel = $event" :privileges="user.privileges"></app-menu>
  </keep-alive>
  <transition name="panel" mode="out-in">
    <keep-alive>
      <app-menu-mobile v-if="menu" @panelChanged="menuMobile($event)" :privileges="user.privileges"></app-menu-mobile>
    </keep-alive>
  </transition>
  <transition name="panel" mode="out-in">
    <keep-alive>
      <component :is="panel" :types="types" :faculties="faculties" :visibilities="visibilities" :sections="sections" :schoolClasses="schoolClasses" :privileges="privileges" :user="user" :collectionsPermissions="collectionsPermissions">
      </component>
    </keep-alive>
  </transition>
  <transition name="fade" mode="out-in">
    <app-popup v-if="popup" :width="'80%'">
      <component v-if="popup" :is="popup" :id="entityToEdit" :types="types" :faculties="faculties" :visibilities="visibilities" :sections="sections" :schoolClasses="schoolClasses" :collectionsPermissions="collectionsPermissions" :privileges="privileges" :subjects="subjects">
      </component>
    </app-popup>
  </transition>
</div>
</template>

<script>
import axios from 'axios'

import {
  eventBus
} from '@/main'

// VUE
import Menu from '@/components/menu/menu.vue'
import MenuMobile from '@/components/menu/menuMobile'
import MenuHeader from '@/components/menu/menuHeader'
import Notifications from '@/components/notifications/notifications'
import panelDashboard from './panels/panelDashboard/panelDashboard'
import panelSearch from './panels/panelSearch/panelSearch'
import panelUpload from './panels/panelUpload/panelUpload'
import panelAdmin from './panels/panelAdmin/panelAdmin'
import panelProfile from './panels/panelProfile/panelProfile'
import panelSettings from './panels/panelSettings/panelSettings'

import PopUp from '@/components/popup/popup'
import EditDocument from '@/components/editDocument/editDocument'
import EditCollection from '@/components/editCollection/editCollection'
import EditUser from '@/components/editUser/editUser'

export default {
  name: 'root',
  data: () => {
    return {
      panel: 'appPanelDashboard',
      types: [],
      faculties: [],
      subjects: [],
      visibilities: [],
      sections: [],
      schoolClasses: [],
      privileges: [],
      collectionsPermissions: [],
      user: {
        privileges: '',
        img: '../static/elements/profile.svg'
      },
      menu: false,
      popup: false,
      entityToEdit: undefined
    }
  },
  created () {
    eventBus.$on('editEntity', (id, component) => {
      this.showPopUp(id, component)
    })

    eventBus.$on('closePopUp', () => {
      this.popup = false
    })

    axios.get('/api/getDocumentTypes/')
      .then((response) => {
        this.types = response.data
      }).catch((e) => {
        eventBus.notification({
          title: e.response.data.messages[0],
          temporary: true
        })
      })

    axios.get('/api/subjects/')
      .then((response) => {
        this.subjects = response.data
      }).catch((e) => {
        eventBus.notification({
          title: e.response.data.messages[0],
          temporary: true
        })
      })

    axios.get('/api/getFaculties/')
      .then((response) => {
        this.faculties = response.data
      }).catch((e) => {
        eventBus.notification({
          title: e.response.data.messages[0],
          temporary: true
        })
      })

    axios.get('/api/getDocumentVisibilityList')
      .then((response) => {
        this.visibilities = response.data
      }).catch((e) => {
        eventBus.notification({
          title: e.response.data.messages[0],
          temporary: true
        })
      })

    axios.get('/api/getSections')
      .then((response) => {
        this.sections = response.data
      }).catch((e) => {
        eventBus.notification({
          title: e.response.data.messages[0],
          temporary: true
        })
      })

    axios.get('/api/getClasses')
      .then((response) => {
        this.schoolClasses = response.data
      }).catch((e) => {
        eventBus.notification({
          title: e.response.data.messages[0],
          temporary: true
        })
      })

    axios.get('/api/getPrivileges')
      .then((response) => {
        this.privileges = response.data
      })
      .catch((e) => {
        eventBus.notification({
          title: e.response.data.messages[0],
          temporary: true
        })
      })

    axios.get('/api/getCollectionsPermissions')
      .then((response) => {
        this.collectionsPermissions = response.data
      })
      .catch((e) => {
        eventBus.notification({
          title: e.response.data.messages[0],
          temporary: true
        })
      })

    this.getUser()
  },
  sockets: {
    newDocument () {
      this.getUser()
    }
  },
  methods: {
    menuMobile (e) {
      this.panel = e
      this.menu = false
    },
    getUser () {
      axios.get('/users/me')
        .then((response) => {
          this.user = response.data
        })
        .catch((e) => {
          eventBus.notification({
            title: e.response.data.messages[0],
            temporary: true
          })
        })
    },
    showPopUp (id, component) {
      this.popup = component
      this.entityToEdit = id
    }
  },
  components: {
    appMenu: Menu,
    appMenuMobile: MenuMobile,
    appMenuHeader: MenuHeader,
    appNotifications: Notifications,
    appPanelDashboard: panelDashboard,
    appPanelSearch: panelSearch,
    appPanelUpload: panelUpload,
    appPanelAdmin: panelAdmin,
    appPanelProfile: panelProfile,
    appPanelSettings: panelSettings,
    appPopup: PopUp,
    appEditDocument: EditDocument,
    appEditCollection: EditCollection,
    appEditUser: EditUser
  }
}
</script>

<style lang="scss">
.main__root {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 25rem auto;
    grid-template-areas: ". main";
    min-height: calc(100vh - 6rem);
    height: 100vh;
    background-color: $color-white-2;
    width: 100vw;
    @include respond(tab-lan) {
        display: block;
        margin-top: 6rem;
        height: auto;
    }

    main {
        grid-area: main;
        font-size: $font-default-2;
        padding: 3vh!important;
        background-color: $color-white-2;

        @include respond(tab-por) {
            height: calc(100vh - 6rem);
        }
    }
}
</style>
