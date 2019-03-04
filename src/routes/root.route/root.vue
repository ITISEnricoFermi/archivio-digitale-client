<template>
<div id="app" class="main__root">
  <nprogress-container></nprogress-container>

    <keep-alive>
  <app-menu :user="user"></app-menu>
    </keep-alive>
  <keep-alive>
    <app-notifications></app-notifications>
  </keep-alive>

  <transition name="panel" mode="out-in">
  <keep-alive>
    <router-view :types="types" :faculties="faculties" :visibilities="visibilities" :sections="sections" :grades="grades" :privileges="privileges" :user="user" :collectionsPermissions="collectionsPermissions" />
  </keep-alive>
  </transition>

  <transition name="fade" mode="out-in">
    <app-popup v-if="popup.component" :width="popup.width + '%'">
      <component v-if="popup.component" :is="popup.component" :entity="popup.entity" :types="types" :faculties="faculties" :visibilities="visibilities" :sections="sections" :grades="grades" :collectionsPermissions="collectionsPermissions"
        :privileges="privileges" :subjects="subjects">
      </component>
    </app-popup>
  </transition>
</div>
</template>

<script>
import eventBus from '@/utils/eventBus'
import v1 from '@/utils/v1'

import NprogressContainer from 'vue-nprogress/src/NprogressContainer'

// VUE
import Menu from '@/components/menu/menu'
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

<style scoped lang="scss">
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

    grid-template-columns: 1fr;
    grid-template-rows: 6rem auto;
    grid-template-areas: "menu" "main";

    @include color-scheme(dark) {
        background: #282828!important;
    }

    @include respond(tab-lan) {
        display: block;
        margin-top: 6rem;
        height: auto;
    }

    .menu {
      grid-area: menu;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 2000;
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
            padding: 3vh 0 0 0!important !important;
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
