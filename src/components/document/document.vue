<template>
<article class="module module--padded document" @click="more">
  <div class="header">
    <router-link :to="'/user/' + document.author._id" tag="div" class="author">
      <img sizes="5rem" :srcset="'/static/pics/' + document.author._id + '/xs 100w, /static/pics/' + document.author._id + '/sm 300w, /static/pics/' + document.author._id + '/md 500w, /static/pics/' + document.author._id + '/lg 800w, /static/pics/' + document.author._id + '/xlg 1200w'"
        :alt="document.author.firstname + ' ' + document.author.lastname">
    </router-link>
    <div class="info">
      <p class="title">{{ document.name }}</p>
      <p class="date">{{ this.date }}</p>
    </div>
  </div>
  <div class="content">
    <p class="description heading-fourth">
      {{ document.description }}
    </p>
  </div>
  <div class="bottom">
    <ul class="actions">
      <li class="action u-noselect" @click="edit" v-if="document.editable">
        <span class="icon">
          <i class="fas fa-edit"></i>
        </span>
        <span class="crop">Modifica</span>
      </li>
      <li class="action u-noselect" @click="download">
        <span class="icon">
          <i class="fas fa-download"></i>
        </span>
        <span class="crop">Scarica</span>
      </li>
      <li class="action u-noselect" @click="view">
        <span class="icon">
          <i class="fas fa-eye"></i>
        </span>
        <span class="crop">Visualizza</span>
      </li>
    </ul>
  </div>
</article>
</template>

<script>
import eventBus from '@/utils/eventBus'

export default {
  props: {
    document: {
      type: Object
    }
  },
  computed: {
    date () {
      let timestamp = this.document._id.toString().substring(0, 8)
      let date = new Date(parseInt(timestamp, 16) * 1000)
      let getMonth = (date) => {
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        return months[date.getMonth()]
      }
      return ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ', ' + date.getDate() + ' ' + getMonth(date)
    }
  },
  methods: {
    more () {
      this.$emit('click', this.document)
    },
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
      // let type = this.document.mimetype.split('/')[0]
      // if (type === 'video') {
      //   return eventBus.openPopUp(this.document, 'appVideo', 70)
      // }
      window.open(`/files/${this.document._id}`, '_blank')
    }
  }
}
</script>

<style scoped lang="scss">
.document {
  display: grid;
  grid-template-rows: repeat(3, min-content);
  grid-gap: 2rem;
  padding-bottom: 0.5rem!important;

    .header {
        display: grid;
        grid-template-columns: 5rem auto;
        grid-gap: 2rem;

        .author {
            border-radius: 100rem;
            // border-radius: 0.3rem;
            overflow: hidden;
            height: 5rem;
            width: 5rem;
            cursor: pointer;

            img {
                height: 100%;
            }
        }

        .info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: left;

            .title {
                font-weight: bold;
                font-size: 1.6rem;
                margin-bottom: 0.75rem;
                color: var(--color-text-primary);
            }

            .date {
                color: var(--color-text-tertiary);
            }
        }

    }

    .content {
      .description {
        text-align: left;
        color: var(--color-text-primary);
      }
    }

    .bottom {
        border-top: 1px solid var(--color-neutral-third);
        padding-top: 0.5rem;

        .actions {
            text-align: right;
            padding: 0;

            @include respond(phone) {
              display: flex;
              justify-content: space-between;
            }

            .action {
                display: inline-block;
                font-weight: bold;
                margin-left: 1.5rem;
                cursor: pointer;
                transition: all 0.2s ease-in-out;
                padding: 1rem;
                border-radius: 0.2rem;
                color: var(--color-text-secondary);

                @include respond(phone) {
                  margin: 0;
                  padding: 1rem 0.5rem;
                }

                &:hover {
                  color: var(--color-secondary);
                  background-color: var(--color-neutral-secondary);
                }

                span.icon {
                  margin: 0 0.5rem;
                }
            }

        }
    }

}
</style>
