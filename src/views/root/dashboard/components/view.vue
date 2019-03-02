<template>
<section class="view module" v-if="document">
  <div class="section header">
    <p class="title heading-secondary">{{document.name}}</p>
    <div class="actions">
      <button class="button" @click="edit">
        <span class="icon">
          <i class="fas fa-edit"></i>
        </span>
        <span class="crop">Modifica</span>
      </button>
      <router-link :to="'/files/' + document._id" class="button" target="_blank">
        <span class="icon">
          <i class="fas fa-eye"></i>
        </span>
        <span class="crop">Visualizza</span>
      </router-link>
      <!-- <button class="button" @click="view">
        <span class="icon">
          <i class="fas fa-eye"></i>
        </span>
        <span class="crop">Visualizza</span>
      </button> -->
      <button class="button" @click="download">
        <span class="icon">
          <i class="fas fa-download"></i>
        </span>
        <span class="crop">Scarica</span>
      </button>
    </div>
  </div>
  <div class="section profile">
    <div class="authors">
      <div class="author">
        <div class="pic">
          <img sizes="5rem" :srcset="'/pics/' + document.author._id + '/xs.jpeg 100w, /pics/' + document.author._id + '/sm.jpeg 300w, /pics/' + document.author._id + '/md.jpeg 500w, /pics/' + document.author._id + '/lg.jpeg 800w, /pics/' + document.author._id + '/xlg.jpeg 1200w'"
            :alt="document.author.firstname + ' ' + document.author.lastname">
        </div>
        <div class="info">
          <p class="info__name heading-tertiary">{{document.author.firstname + ' ' + document.author.lastname}}</p>
          <p class="info__privileges">{{document.author.privileges.privilege}}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="section info">
    <p class="description">{{document.description}}</p>
    <ul class="tags">
      <li v-if="document.subject" class="tag u-noselect">
        <span class="icon">
          <i class="fas fa-tag"></i>
        </span>
        <span class="crop" v-if="document.subject.subject.length >= 30">{{document.subject._id | uppercase }}</span>
        <span class="crop" v-else>{{document.subject.subject}}</span>
      </li>
      <li v-if="document.grade || document.section" class="tag u-noselect">
        <span class="icon">
          <i class="fas fa-tag"></i>
        </span>
        <span v-if="document.grade" class="crop">{{document.grade.grade}}˚</span>
        <span v-if="document.section" class="crop">{{document.section.section}}</span>
      </li>
      <li v-if="document.type" class="tag u-noselect">
        <span class="icon">
          <i class="fas fa-tag"></i>
        </span>
        <span class="crop">{{document.type.type}}</span>
      </li>
    </ul>
  </div>
  <div class="section collections">
    <div class="collection" v-for="(collection, index) in collections" :key="index">
      <p class="collection__title">
        {{ collection.documentCollection }}
      </p>
      <div class="list">
        <router-link class="list__element" v-for="(collecion_document, document_index) in collection.documents" tag="a" :key="document_index" :to="'/files/' + collecion_document._id" target="_blank">
          <span class="crop">
            {{document_index}}. {{collecion_document.name}}
          </span>
          <span class="icon">
            <i class="fas fa-external-link-alt"></i>
          </span>
        </router-link>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import {
  v1,
  eventBus
} from '@/main'

export default {
  props: ['document'],
  data () {
    return {
      collections: []
    }
  },
  watch: {
    async document (value) {
      const response = await v1.get(`/documents/${value._id}/collections`)
      this.collections = response.data
    }
  },
  filters: {
    uppercase (value) {
      return value.toUpperCase()
    }
  },
  methods: {
    edit () {
      eventBus.openPopUp(this.document, 'appEditDocument', 80)
    },
    download () {
      let a = document.createElement('A')
      a.href = `/public/documents/${this.document.directory}`
      a.download = this.document.name
      a.click()
    },
    view () {
      let type = this.document.mimetype.split('/')[0]
      if (type === 'video') {
        return eventBus.openPopUp(this.document, 'appVideo', 70)
      }
      window.open(`/public/documents/${this.document.directory}`, '_blank')
    }
  }
}
</script>

<style scoped lang="scss">
.view {
    background-color: $color-white-1!important;
    // overflow-y: scroll;

    @include color-scheme(dark) {
        background: $linear-gradient-primary--dark!important;
    }

    .section {
        padding: 3rem;

        &:not(:last-child) {
            border-bottom: 1px solid $color-white-5;

            @include color-scheme(dark) {
                border-color: rgba($color-white, 0.3);
            }
        }

    }

    .header {

        .title {
            font-weight: 400;
            text-align: left;
        }

        .actions {
            text-align: left;
            margin-top: 1rem;

            .button {
                display: inline-block;
                width: auto;
                color: $color-black;
                font-weight: 400;

                &:not(:last-child) {
                    margin-right: 1rem;
                }
            }
        }
    }

    .info {

        .description {
            text-align: left;
            color: $color-grey-2;

            @include color-scheme(dark) {
                color: $color-white-3;
            }
        }

        .tags {
            text-align: left;
            margin-top: 1.5rem;
            // display: flex;
            // flex-wrap: wrap;
            // justify-content: space-between;
        }
    }

    .profile {
        .authors {

            .author {
                text-align: left;

                .pic {
                    border-radius: 100rem;
                    overflow: hidden;
                    height: 5rem;
                    width: 5rem;
                    display: inline-block;
                    vertical-align: middle;

                    img {
                        height: 100%;
                    }
                }
            }

            .info {
                display: inline-block;
                padding: 0 2rem;
                vertical-align: middle;
                text-align: left;

                &__name {
                    font-weight: 400;
                }

                &__privileges {
                    margin-top: 0.4rem;
                    color: $color-grey-2;
                }
            }
        }
    }

    .collections {

        .collection {

            &:not(:last-child) {
                margin-bottom: 1.5rem;
            }

            &__title {
                text-align: left;
                margin-bottom: 1rem;
            }

            &__documents {
                padding: 0;
                border-radius: 0.25rem;
                background-color: $color-white-2;
                border: 1px solid darken($color-white-5, 5%);

                li {
                    list-style: none;
                    font-size: $font-default-2;
                    cursor: pointer;
                    text-align: left;
                    position: relative;

                    &:not(:last-child) {
                        border-bottom: 1px solid darken($color-white-5, 5%);
                    }

                    &:hover {
                        background-color: $color-white-5;
                    }

                    a {
                        text-align: none;
                        color: $color-tertiary;
                        display: block;
                        padding: 0.9rem 0.8rem;

                        .result {
                            max-width: calc(100% - 2rem);
                            display: inline-block;
                        }

                        .open {
                            position: absolute;
                            right: 1rem;
                            top: 50%;
                            transform: translateY(-50%);
                            color: $color-grey-1;
                        }
                    }
                }
            }

        }
    }
}
</style>
