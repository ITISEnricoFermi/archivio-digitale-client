<template>
<section class="view module" v-if="document">
  <div class="header">
    <p class="title heading-secondary">{{document.name}}</p>
    <div class="actions">
      <button class="button">
        <span class="icon">
          <i class="fas fa-edit"></i>
        </span>
        <span class="crop" @click="edit">Modifica</span>
      </button>
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
  <div class="info">
    <p class="description">{{document.description}}</p>
    <ul class="tags">
      <li v-if="document.subject" class="u-bg-color-blue">
        <span class="icon">
          <i class="fas fa-tag"></i>
        </span>
        <span class="crop">{{document.subject.subject}}</span>
      </li>
      <li v-if="document.grade || document.section" class="u-bg-color-yellow">
        <span class="icon">
          <i class="fas fa-tag"></i>
        </span>
        <span v-if="document.grade" class="crop">{{document.grade.grade}}˚</span>
        <span v-if="document.section" class="crop">{{document.section.section}}</span>
      </li>
      <li v-if="document.type" class="u-bg-color-green">
        <span class="icon">
          <i class="fas fa-tag"></i>
        </span>
        <span class="crop">{{document.type.type}}</span>
      </li>
    </ul>
  </div>
</section>
</template>

<script>
import {
  eventBus
} from '@/main'

export default {
  props: ['document'],
  methods: {
    edit() {
      eventBus.openPopUp(this.document, 'appEditDocument', 80)
    },
    download() {
      let a = document.createElement('A')
      a.href = `/public/documents/${this.document.directory}`
      a.download = this.document.name
      a.click()
    },
    view() {
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

    .header {
        border-bottom: 1px solid $color-white-5;
        padding: 3rem;

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
        padding: 3rem;

        .description {
            text-align: left;
            color: $color-grey-2;
        }

        .tags {
            text-align: left;
            margin-top: 2rem;

            li {
                padding: 0.5rem 1rem;
                border-radius: 0.3rem;
                display: inline-block;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                color: $color-white;
                background-color: #d8e5d7!important;
                border: 1px solid darken(#d8e5d7, 5%)!important;
                color: $color-tertiary;

                &:not(:first-child) {
                    margin-left: 0.5rem;
                }

                .icon {
                  color: darken(#d8e5d7, 20%);
                  margin-right: 0.75rem;
                }

            }
        }

    }
}
</style>
