<template>
  <section class="view module module--padded">
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
    background-color: $color-white-1 !important;

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
      margin-top: 2rem;

      .description {
        text-align: left;
        color: $color-grey-2;
      }
    }
  }
</style>
