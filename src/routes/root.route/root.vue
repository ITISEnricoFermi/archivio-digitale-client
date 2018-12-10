<template>
<div id="app" class="main__root">
  <nprogress-container></nprogress-container>
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

  <keep-alive>
    <router-view :types="types" :faculties="faculties" :visibilities="visibilities" :sections="sections" :grades="grades" :privileges="privileges" :user="user" :collectionsPermissions="collectionsPermissions"/>
  </keep-alive>

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
  v1
} from '@/main'

import NprogressContainer from 'vue-nprogress/src/NprogressContainer'

// VUE
import Menu from '@/components/menu/menu.vue'
import MenuMobile from '@/components/menu/menuMobile'
import MenuHeader from '@/components/menu/menuHeader'
import Notifications from '@/components/notifications/notifications'

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
  watch: {
    $route (to, from) {
      this.menu = false
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

    v1.get('/document_types/')
      .then((response) => {
        this.types = response.data
      }).catch((e) => {
        eventBus.notification({
          title: e.response.data.messages[0],
          temporary: true
        })
      })

    v1.get('/subjects/')
      .then((response) => {
        this.subjects = response.data
      }).catch((e) => {
        eventBus.notification({
          title: e.response.data.messages[0],
          temporary: true
        })
      })

    v1.get('/faculties/')
      .then((response) => {
        this.faculties = response.data
      }).catch((e) => {
        eventBus.notification({
          title: e.response.data.messages[0],
          temporary: true
        })
      })

    v1.get('/document_visibility/')
      .then((response) => {
        this.visibilities = response.data
      }).catch((e) => {
        eventBus.notification({
          title: e.response.data.messages[0],
          temporary: true
        })
      })

    v1.get('/sections/')
      .then((response) => {
        this.sections = response.data
      }).catch((e) => {
        eventBus.notification({
          title: e.response.data.messages[0],
          temporary: true
        })
      })

    v1.get('/grades/')
      .then((response) => {
        this.grades = response.data
      }).catch((e) => {
        eventBus.notification({
          title: e.response.data.messages[0],
          temporary: true
        })
      })

    v1.get('/privileges/')
      .then((response) => {
        this.privileges = response.data
      })
      .catch((e) => {
        eventBus.notification({
          title: e.response.data.messages[0],
          temporary: true
        })
      })

    v1.get('/collection_permissions/')
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
      v1.get('/users/me')
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
    appPopup: PopUp,
    appEditDocument: EditDocument,
    appEditCollection: EditCollection,
    appEditUser: EditUser,
    appVideo: Video,
    NprogressContainer
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
    max-width: 100vw;
    overflow-x: hidden;

    @include color-scheme(dark) {
        background: #282828!important;
    }

    @include respond(tab-lan) {
        display: block;
        margin-top: 6rem;
        height: auto;
    }

    main {
        grid-area: main;
        font-size: $font-default-2;
        background-color: $color-white-2;

        @include color-scheme(dark) {
            background: #282828!important;
        }

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

#nprogress {
  position: fixed;
  top: 0;
  z-index: 1000000;
  width: 100vw;
  outline: none;

  .bar {
    height: 0.4rem;
    background-image: $linear-gradient-primary--light;
    outline: none;

    @include color-scheme(dark) {
        background: $linear-gradient-primary--dark!important;
    }

  }

}
</style>
