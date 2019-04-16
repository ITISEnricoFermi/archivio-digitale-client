<template>
<main class="panel">
  <div class="profile">
    <div class="profile-cover">
      <div class="profile-img">
        <div class="profile-cover__content" v-if="user">
          <img class="profile-cover__pic" sizes="36vh" :srcset="'/static/pics/' + user._id + '/xs 100w, /static/pics/' + user._id + '/sm 300w, /static/pics/' + user._id + '/md 500w, /static/pics/' + user._id + '/lg 800w, /static/pics/' + user._id + '/xlg 1200w'" :alt="user.firstname + ' ' + user.lastname">
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
import eventBus from '@/utils/eventBus'

export default {
  data () {
    return {
      tab: 'pubblico',
      documents: [],
      count: {
        pubblico: '',
        areariservata: '',
        materia: ''
      },
      user: undefined,
      id: this.$route.params.id
    }
  },
  watch: {
    async $route (to, from) {
      this.id = to.params.id

      const [user] = await Promise.all([
        this.getUser(),
        this.showTab('pubblico')
      ])

      const [pubblico, areariservata, materia] = await Promise.all([
        v1.get(`/users/${this.id}/documents/count/pubblico`),
        v1.get(`/users/${this.id}/documents/count/areariservata`),
        v1.get(`/users/${this.id}/documents/count/materia`)
      ])

      this.count.pubblico = pubblico.data
      this.count.areariservata = areariservata.data
      this.count.materia = materia.data

      this.user = user
    }
  },
  sockets: {
    async newDocument () {
      this.documents = await this.getDocuments(this.tab)
    }
  },
  async created () {
    try {
      if (this.id) {
        const promises = [
          this.getUser(),
          this.getDocuments('pubblico')
        ]

        const [user, documents] = await Promise.all(promises)

        this.user = user
        this.documents = documents
      }
    } catch (e) {
      eventBus.notification({
        title: 'Impossibile reperire informazioni sull\'utente.',
        temporary: true
      })
    }

    try {
      const [pubblico, areariservata, materia] = await Promise.all([
        v1.get(`/users/${this.id}/documents/count/pubblico`),
        v1.get(`/users/${this.id}/documents/count/areariservata`),
        v1.get(`/users/${this.id}/documents/count/materia`)
      ])

      this.count.pubblico = pubblico.data
      this.count.areariservata = areariservata.data
      this.count.materia = materia.data
    } catch (e) {
      eventBus.notification({
        title: 'Impossibile reperire il numero di documenti.',
        temporary: true
      })
    }
  },
  methods: {
    async showTab (privileges) {
      this.tab = privileges
      this.documents = await this.getDocuments(privileges)
    },
    async getDocuments (tab) {
      const response = await v1.get(`/users/${this.id}/documents/${tab}`)
      return response.data
    },
    async getUser () {
      const response = await v1.get(`/users/${this.id}`)
      return response.data
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
