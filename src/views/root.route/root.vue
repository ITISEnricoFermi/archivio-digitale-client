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
      <component :is="panel" :types="types" :faculties="faculties" :visibilities="visibilities" :sections="sections" :grades="grades" :privileges="privileges" :user="user" :collectionsPermissions="collectionsPermissions">
      </component>
    </keep-alive>
  </transition>

  <transition name="fade" mode="out-in">
    <app-popup v-if="popup.component" :width="popup.width + '%'">
      <component v-if="popup.component" :is="popup.component" :entity="popup.entity" :types="types" :faculties="faculties" :visibilities="visibilities" :sections="sections" :grades="grades" :collectionsPermissions="collectionsPermissions" :privileges="privileges" :subjects="subjects">
      </component>
    </app-popup>
  </transition>
</div>
</template>

<script>
import {
  eventBus,
  api
} from '@/main'

// VUE
import Menu from '@/components/menu/menu.vue'
import MenuMobile from '@/components/menu/menuMobile'
import MenuHeader from '@/components/menu/menuHeader'
import Notifications from '@/components/notifications/notifications'

// Panels
import panelDashboard from './panels/dashboard.panel/dashboard.panel'
import panelSearch from './panels/search.panel/search.panel'
import panelUpload from './panels/upload.panel/upload.panel'
import panelAdmin from './panels/admin.panel/admin.panel'
import panelProfile from './panels/profile.panel/profile.panel'
import panelSettings from './panels/settings.panel/settings.panel'

import PopUp from '@/components/popup/popup'
import EditDocument from '@/components/editDocument/editDocument'
import EditCollection from '@/components/editCollection/editCollection'
import EditUser from '@/components/editUser/editUser'
import Video from '@/components/video/video'

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
      grades: [],
      privileges: [],
      collectionsPermissions: [],
      user: {
        privileges: '',
        img: '../elements/profile.svg'
      },
      menu: false,
      popup: {
        entity: undefined,
        component: undefined,
        width: 80
      }
    }
  },
  created () {
    eventBus.$on('openPopUp', (entity, component, width) => {
      this.popup.entity = entity
      this.popup.component = component
      this.popup.width = width
    })

    eventBus.$on('closePopUp', () => {
      this.popup = {
        entity: undefined,
        component: undefined,
        width: undefined
      }
    })

    api.get('/document_types/')
      .then((response) => {
        this.types = response.data
      }).catch((e) => {
        eventBus.notification({
          title: e.response.data.messages[0],
          temporary: true
        })
      })

    api.get('/subjects/')
      .then((response) => {
        this.subjects = response.data
      }).catch((e) => {
        eventBus.notification({
          title: e.response.data.messages[0],
          temporary: true
        })
      })

    api.get('/faculties/')
      .then((response) => {
        this.faculties = response.data
      }).catch((e) => {
        eventBus.notification({
          title: e.response.data.messages[0],
          temporary: true
        })
      })

    api.get('/document_visibility/')
      .then((response) => {
        this.visibilities = response.data
      }).catch((e) => {
        eventBus.notification({
          title: e.response.data.messages[0],
          temporary: true
        })
      })

    api.get('/sections/')
      .then((response) => {
        this.sections = response.data
      }).catch((e) => {
        eventBus.notification({
          title: e.response.data.messages[0],
          temporary: true
        })
      })

    api.get('/grades/')
      .then((response) => {
        this.grades = response.data
      }).catch((e) => {
        eventBus.notification({
          title: e.response.data.messages[0],
          temporary: true
        })
      })

    api.get('/privileges/')
      .then((response) => {
        this.privileges = response.data
      })
      .catch((e) => {
        eventBus.notification({
          title: e.response.data.messages[0],
          temporary: true
        })
      })

    api.get('/collection_permissions/')
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
      api.get('/users/me')
        .then((response) => {
          this.user = response.data
        })
        .catch((e) => {
          eventBus.notification({
            title: e.response.data.messages[0],
            temporary: true
          })
        })
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
    appEditUser: EditUser,
    appVideo: Video
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
            padding: 3vh 0 0 0!important;
        }
    }
}

.module {
  @include respond(tab-por) {
    border-radius: 0!important;
  }
}
</style>
