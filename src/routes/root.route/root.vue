<template>
<div class="main__root">
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

import Menu from '@/components/menu/menu'
import Notifications from '@/components/notifications/notifications'

import PopUp from '@/components/popup/popup'
import EditDocument from '@/components/editDocument/editDocument'
import EditCollection from '@/components/editCollection/editCollection'
import EditUser from '@/components/editUser/editUser'
import Video from '@/components/video/video'
import TransferDocuments from '@/components/transferDocuments/transferDocuments'

export default {
  data () {
    return {
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
  async created () {
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

    try {
      const [types,
        subjects,
        faculties,
        visibilities,
        sections,
        grades,
        privileges,
        collectionsPermissions,
        user
      ] = await Promise.all([
        v1.get('/document_types/'),
        v1.get('/subjects/'),
        v1.get('/faculties/'),
        v1.get('/document_visibility/'),
        v1.get('/sections/'),
        v1.get('/grades/'),
        v1.get('/privileges/'),
        v1.get('/collection_permissions/'),
        v1.get('/users/' + localStorage.getItem('id'))
      ])

      this.types = types.data
      this.subjects = subjects.data
      this.faculties = faculties.data
      this.visibilities = visibilities.data
      this.sections = sections.data
      this.grades = grades.data
      this.privileges = privileges.data
      this.collectionsPermissions = collectionsPermissions.data
      this.user = user.data
    } catch (e) {
      eventBus.notification({
        title: e.response.data.messages[0],
        temporary: true
      })
    }
  },
  sockets: {
    async newDocument () {
      try {
        const response = await v1.get('/users/' + localStorage.getItem('id'))
        this.user = response.data
        await this.getUser()
      } catch (e) {
        eventBus.notification({
          title: e.response.data.messages[0],
          temporary: true
        })
      }
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
    appTransferDocuments: TransferDocuments,
    NprogressContainer
  }
}
</script>

<style scoped lang="scss">
.main__root {
    min-height: 100vh;
    background-color: $color-white-2;
    width: 100vw;
    max-width: 100vw;
    overflow-x: hidden;

    @include color-scheme(dark) {
        background: #282828!important;
    }

    @include respond(tab-lan) {
        height: auto;
    }

    .menu {
        grid-area: menu;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 2000;
    }

    .panel {
        min-height: calc(100vh - 6rem);
        margin-top: 6rem;
        font-size: $font-default-2;
        background-color: $color-white-2;

        @include color-scheme(dark) {
            background: #282828!important;
        }

        @include respond(tab-por) {
            padding: 3vh 0 0 0!important !important;
        }
    }
}

.module {
    @include respond(tab-por) {
        border-radius: 0!important;
    }
}
</style>
