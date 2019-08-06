<template>
<section class="view module" v-if="document">
  <div class="section header">
    <p class="title heading-secondary">{{document.name}}</p>
    <div class="actions">
      <button class="button" @click="edit" v-if="document.editable">
        <span class="icon">
          <i class="fas fa-edit"></i>
        </span>
        <span class="crop">Modifica</span>
      </button>
      <!-- <router-link :to="'/files/' + document._id" class="button" target="_blank">
        <span class="icon">
          <i class="fas fa-eye"></i>
        </span>
        <span class="crop">Visualizza</span>
      </router-link> -->
      <button class="button" @click="view">
        <span class="icon">
          <i class="fas fa-eye"></i>
        </span>
        <span class="crop">Visualizza</span>
      </button>
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
      <router-link class="author" :to="'/user/' + document.author._id" tag="div">
        <div class="pic">
          <img sizes="5rem" :srcset="'/static/pics/' + document.author._id + '/xs 100w, /static/pics/' + document.author._id + '/sm 300w, /static/pics/' + document.author._id + '/md 500w, /static/pics/' + document.author._id + '/lg 800w, /static/pics/' + document.author._id + '/xlg 1200w'"
            :alt="document.author.firstname + ' ' + document.author.lastname">
        </div>
        <div class="info">
          <p class="info__name heading-tertiary">{{document.author.firstname + ' ' + document.author.lastname}}</p>
          <p class="info__privileges">{{document.author.privileges.privilege}}</p>
        </div>
      </router-link>
    </div>
  </div>
  <div class="section info">
    <p class="description" v-if="document.description">{{document.description}}</p>
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
import eventBus from '@/utils/eventBus'
import v1 from '@/utils/v1'

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
      a.href = `/static/documents/${this.document._id}`
      a.download = this.document.name
      a.click()
    },
    view () {
      let type = this.document.mimetype.split('/')[0]
      if (type === 'video') {
        return eventBus.openPopUp(this.document, 'appVideo', 70)
      }
      window.open(`/files/${this.document._id}`, '_blank')
    }
  }
}
</script>

<style scoped lang="scss">
.view {
    background-color: var(--color-surface-secondary)!important;
    // overflow-y: scroll;

    .section {
        padding: 3rem;

        &:not(:last-child) {
            border-bottom: 1px solid var(--color-neutral-third);

            @include color-scheme(dark) {
                border-color: rgba(white, 0.3);
            }
        }

    }

    .header {

        .title {
            font-weight: 400;
            text-align: left;
            color: var(--color-text-primary);
        }

        .actions {
            text-align: left;
            margin-top: 1rem;

            .button {
                display: inline-block;
                width: auto;
                font-weight: 400;
                color: black;

                &:not(:last-child) {
                    margin-right: 1rem;
                }
            }
        }
    }

    .info {

      & > *:not(:first-child) {
        margin-top: 1.5rem;
      }

        .description {
            text-align: left;
            color: var(--color-text-tertiary);
        }

        .tags {
            text-align: left;
            // display: flex;
            // flex-wrap: wrap;
            // justify-content: space-between;
        }
    }

    .profile {
      transition: all 0.2s ease-in-out;
      cursor: pointer;

      &:hover {
        background-color: var(--color-background)!important;

        @include color-scheme(dark) {
            background: rgba(white,0.05)!important;
        }
      }

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

                .info {
                    display: inline-block;
                    padding: 0 2rem;
                    vertical-align: middle;
                    text-align: left;

                    &__name {
                        font-weight: 400;
                        color: var(--color-text-primary);
                    }

                    &__privileges {
                        margin-top: 0.4rem;
                        color: var(--color-text-tertiary);
                    }
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
                background-color: var(--color-background);
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
                        background-color: var(--color-neutral-third);
                    }

                    a {
                        text-align: none;
                        color: var(--color-primary);
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
                            color: var(--color-text-secondary);
                        }
                    }
                }
            }

        }
    }
}
</style>
