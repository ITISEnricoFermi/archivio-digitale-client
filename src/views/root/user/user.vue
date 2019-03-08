<template>
<main class="panel">
  <div class="profile">
    <div class="profile-cover">
      <div class="profile-img">
        <div class="profile-cover__content">
          <img class="profile-cover__pic" sizes="36vh" :srcset="'/pics/' + user._id + '/xs.jpeg 100w, /pics/' + user._id + '/sm.jpeg 300w, /pics/' + user._id + '/md.jpeg 500w, /pics/' + user._id + '/lg.jpeg 800w, /pics/' + user._id + '/xlg.jpeg 1200w'" :alt="user.firstname + ' ' + user.lastname">
          <div class="profile-cover__info">
            <p class="profile-cover__info--name heading-primary">{{user.firstname}} {{user.lastname}}</p>
          </div>
        </div>
      </div>
      <div class="profile-menu">
        <ul class="profile-menu__ul">
          <li class="profile-menu__li" @click="showTab('pubblico')">
            <div>
              <span class="profile-menu__li--value heading-tertiary">{{ count.pubblico }}</span>
              <span class="profile-menu__li--tag heading-fifth">Documenti pubblici</span>
            </div>
          </li>
          <li class="profile-menu__li" @click="showTab('areariservata')">
            <div>
              <span class="profile-menu__li--value heading-tertiary">{{ count.areariservata }}</span>
              <span class="profile-menu__li--tag heading-fifth">Documenti in area riservata</span>
            </div>
          </li>
          <li class="profile-menu__li" @click="showTab('materia')">
            <div>
              <span class="profile-menu__li--value heading-tertiary">{{count.materia }}</span>
              <span class="profile-menu__li--tag heading-fifth">Documenti per materia</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="profile-documents">
      <div class="module module--padded" v-if="documents.messages">
        <div class="row">
          <div class="col-1-of-1">
            <p>Nessun documento nella scheda selezioanata.</p>
          </div>
        </div>
      </div>
      <app-document :document="document" v-for="document in documents" :key="document._id" v-else></app-document>
    </div>
  </div>
</main>
</template>

<script>
import Document from '@/components/document/document'

import v1 from '@/utils/v1'

export default {
  name: 'panelProfile',
  props: ['user'],
  data: () => {
    return {
      tab: 'pubblico',
      response: false,
      responseMessage: '',
      documents: [],
      count: {
        pubblico: '',
        areariservata: '',
        materia: ''
      }
    }
  },
  sockets: {
    newDocument () {
      this.getDocuments(this.tab)
    }
  },
  created () {
    this.getDocuments('pubblico')
    const id = localStorage.getItem('id')
    v1.get(`/users/${id}/documents/count/pubblico`)
      .then((response) => {
        this.count.pubblico = response.data
      })
      .catch((e) => {
        this.response = true
        this.responseMessage = ''
      })

    v1.get(`/users/${id}/documents/count/areariservata`)
      .then((response) => {
        this.count.areariservata = response.data
      })
      .catch((e) => {
        this.response = true
        this.responseMessage = ''
      })

    v1.get(`/users/${id}/documents/count/materia`)
      .then((response) => {
        this.count.materia = response.data
      })
      .catch((e) => {
        this.response = true
        this.responseMessage = ''
      })
  },
  methods: {
    showTab (privileges) {
      this.tab = privileges
      this.getDocuments(privileges)
    },
    getDocuments (tab) {
      const id = localStorage.getItem('id')
      v1.get(`/users/${id}/documents/${tab}`)
        .then((response) => {
          this.documents = response.data
        })
        .catch((e) => {
          this.response = true
          this.responseMessage = e.response.data
        })
    }
  },
  components: {
    appDocument: Document
  }
}
</script>

<style scoped lang="scss">

.panel {
    padding: 3vh;

    @include respond(tab-lan) {
      padding: 0!important;
    }

}

.profile {
    .profile-cover {
        width: 100%;
        height: 45vh;
        background-image: url("/layout/pattern3.svg");
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        position: relative;
        border-radius: 0.25rem;
        overflow: hidden;

        @include respond(tab-por) {
          border-radius: 0;
        }

        .profile-img {
            width: 100%;
            position: absolute;
            top: 0;
            height: 36vh;
        }

        &__content {
            position: absolute;
            @include absCenter;
            text-align: center;
            width: 100%;

            * {
                margin: 1rem;
            }
        }

        &__pic {
            width: 25vh;
            height: 25vh;
            border-radius: 100%;
            border: 0.5rem solid $color-white;
            box-shadow: 0 0.25rem 0.75rem rgba($color-black, 0.5);
            margin: 0 auto;
            transition: transform 0.2s;
            cursor: pointer;

            &:hover {
                transform: scale(1.1);
            }
        }

        &__info {
            display: none;
        }
    }

    .profile-menu {
        color: $color-white;
        position: absolute;
        width: 100%;
        bottom: 0;

        &__ul {
            width: 100%;
            padding: 0;
            text-align: center;
            margin: 0 auto;
            @include clearfix;
        }

        &__li {
            background-size: 250%;
            transition: all 0.4s;
            cursor: pointer;
            background-color: rgba($color-black, 0.5);
            padding: 2vh;
            list-style: none;
            display: inline-table;
            float: left;
            width: calc(100% / 3);

            @include respond(phone) {
                min-height: 12vh;
                padding: 1vh;
            }

            &:hover {
                background-image: linear-gradient(120deg, transparent 0%, transparent 50%, rgba($color-white, 0.3) 50%);
                background-position: 100%;
            }

            div {
                vertical-align: middle;
                display: table-cell;

                span {
                    display: block;

                    &:not(:last-child) {
                        margin-bottom: 0.25rem;
                    }
                }
            }
        }
    }

    .profile-documents {
        padding: 3vh 0 0;
    }
}
</style>
