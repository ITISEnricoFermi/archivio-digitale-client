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
  <div class="section info">
    <p class="description">{{document.description}}</p>
    <ul class="tags">
      <li v-if="document.subject" class="u-noselect">
        <span class="icon">
          <i class="fas fa-tag"></i>
        </span>
        <span class="crop">{{document.subject.subject}}</span>
      </li>
      <li v-if="document.grade || document.section" class="u-noselect">
        <span class="icon">
          <i class="fas fa-tag"></i>
        </span>
        <span v-if="document.grade" class="crop">{{document.grade.grade}}˚</span>
        <span v-if="document.section" class="crop">{{document.section.section}}</span>
      </li>
      <li v-if="document.type" class="u-noselect">
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
      <ul class="collection__documents">
        <li v-for="(collecion_document, document_index) in collection.documents" :key="document_index">
          <a :href="'/files/' + collecion_document._id" target="_blank">
            <span class="result">
              {{document_index}}. {{collecion_document.name}}
            </span>
            <span class="open">
              <i class="fas fa-external-link-alt"></i>
            </span>
          </a>
        </li>
      </ul>
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

    .section {
        padding: 3rem;

        &:not(:last-child) {
            border-bottom: 1px solid $color-white-5;
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
        }

        .tags {
            text-align: left;
            margin-top: 1.75rem;
            // display: flex;
            // flex-wrap: wrap;
            // justify-content: space-between;

            li {
                margin-top: 0.25rem;
                padding: 0.5rem 1rem;
                border-radius: 0.3rem;
                text-overflow: ellipsis;
                overflow: hidden;
                display: inline-block;
                white-space: nowrap;
                color: $color-white;
                background-color: #d8e5d7!important;
                border: 1px solid darken(#d8e5d7, 5%)!important;
                color: $color-tertiary;
                box-shadow: 0 1px 2px rgba(10,10,10,0.1);
                cursor: pointer;
                transition: all 0.2s ease-in-out;

                &:active {
                    transform: scale(1.02);
                }

                &:not(:last-child) {
                    margin-right: 0.5rem;
                }

                .icon {
                    color: darken(#d8e5d7, 20%);
                    margin-right: 0.75rem;
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
