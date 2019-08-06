<template>
<div class="module module--padded collection">
  <div class="row collection-header">
    <div class="col-1-of-1">
      <router-link :to="'/user/' + collection.author._id" tag="div" class="collection-header__img">
        <img sizes="5rem" :srcset="'/static/pics/' + collection.author._id + '/xs 100w, /static/pics/' + collection.author._id + '/sm 300w, /static/pics/' + collection.author._id + '/md 500w, /static/pics/' + collection.author._id + '/lg 800w, /static/pics/' + collection.author._id + '/xlg 1200w'"
          :alt="collection.author.firstname + ' ' + collection.author.lastname"/>
      </router-link>
      <div class="collection-header__info">
        <p class="collection-header__info--head heading-fourth">
          <span>{{collection.author.firstname}} {{collection.author.lastname}}</span>
          <span> ha creato</span>
          <span> {{collection.documentCollection}}</span>.
        </p>
        <p class="collection-header__info--date">
          {{ this.date }}
        </p>
      </div>
      <div class="collection-header__menu" @mouseleave="closeMenu">
        <span class="u-noselect" @click="menu = !menu" v-if="collection.editable">
          <i class="fas fa-ellipsis-h"></i>
        </span>
        <transition name="fade">
          <app-menu v-if="menu" @edit="edit"></app-menu>
        </transition>
      </div>
    </div>
  </div>
  <div class="list">
    <p class="list__element" v-if="collection.documents.length === 0">Nessun documento nella collezione.</p>
    <router-link class="list__element" v-for="(document, index) in collection.documents" :key="index" :to="'/static/documents/' + document._id" tag="a" target="_blank">
      <span class="crop">
        {{index}}. {{document.name}}
      </span>
      <span class="icon">
        <i class="fas fa-external-link-alt"></i>
      </span>
    </router-link>
  </div>
</div>
</template>

<script>
import eventBus from '@/utils/eventBus'

import Menu from './menu'

export default {
  props: ['collection'],
  data () {
    return {
      menu: false
    }
  },
  computed: {
    date () {
      let timestamp = this.collection._id.toString().substring(0, 8)
      let date = new Date(parseInt(timestamp, 16) * 1000)
      let getMonth = (date) => {
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        return months[date.getMonth()]
      }
      return ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ', ' + date.getDate() + ' ' + getMonth(date)
    }
  },
  methods: {
    edit () {
      eventBus.openPopUp(this.collection, 'appEditCollection', 80)
    },
    closeMenu () {
      if (this.menu) {
        this.menu = false
      }
    }
  },
  components: {
    appMenu: Menu
  }
}
</script>

<style scoped lang="scss">
.collection {

    &-header {
        text-align: left;
        display: table;
        width: 100%;

        .col-1-of-1 {
            position: relative;
        }

        &__img {
            display: inline-block;
            height: 5rem;
            width: 5rem;
            // border-radius: 100%;
            border-radius: 0.25rem;
            overflow: hidden;
            vertical-align: middle;
            cursor:pointer;

            img {
                height: 100%;
            }
        }

        &__info {
            display: inline-block;
            vertical-align: middle;
            width: calc(100% - 6rem);
            padding-left: 1.5rem;

            &--head {
                vertical-align: middle;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                margin-bottom: 0.5rem;
                color: var(--color-text-primary);

                span {

                    &:not(:nth-child(2)) {
                        font-weight: 500;
                    }

                    &:nth-child(1),
                    &:nth-child(2) {
                        @include respond(phone) {
                            display: none;
                        }
                    }

                }
            }

            &--date {
                display: inline-block;
                vertical-align: middle;
                color: var(--color-text-secondary);
            }
        }

        &__menu {
            position: absolute;
            cursor: pointer;
            top: 0;
            right: 0;
            color: var(--color-text-primary);

            span {
                display: block;
                padding: 0.5rem 1rem;
                transition: all 0.2s ease-in-out;

                &:hover {
                    transform: rotate(180deg);
                }

            }
        }

    }
}
</style>
