<template>
<div class="module document">
  <div class="row document-header">
    <div class="col-1-of-1">
      <div class="document-header__img">
        <img v-bind:src="'pics/' + document.author.img" :alt="document.author.firstname + ' ' + document.author.lastname">
      </div>
      <div class="document-header__info">
        <p class="document-header__info--head heading-fourth">
          <span>{{document.author.firstname}} {{document.author.lastname}}</span>
          <span> ha pubblicato</span>
          <span>{{document.name}}</span>.
        </p>
        <p class="document-header__info--date heading-fifth">{{ this.date }}
        </p>
      </div>
      <div class="document-header__menu" @mouseleave="closeMenu">
        <span class="u-noselect" @click="menu = !menu">
          <i class="fas fa-ellipsis-h"></i>
        </span>
        <transition name="fade">
          <app-menu v-if="menu" :own="document.own" @edit="edit" @download="download" @view="view"></app-menu>
        </transition>
      </div>
    </div>
  </div>
  <div class="row document-info">
    <div class="col-1-of-1">
      <p class="document-info__description">{{document.description}}</p>
    </div>
  </div>
  <div class="row document-footer">
    <div class="col-1-of-1">
      <ul class="document-footer__info">
        <li v-if="document.subject" class="u-bg-color-blue">{{document.subject.subject}}</li>
        <li v-if="document.class || document.section" class="u-bg-color-yellow">
          <span v-if="document.class">{{document.class.class}}</span>
          <span v-if="document.section">{{document.section.section}}</span>
        </li>
        <li v-if="document.type" class="u-bg-color-green">{{document.type.type}}</li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import {
  eventBus
} from '@/main'

import Menu from './menu'

export default {
  name: 'document',
  props: ['document'],
  data: () => {
    return {
      menu: false
    }
  },
  computed: {
    date: function () {
      let timestamp = this.document._id.toString().substring(0, 8)
      return new Date(parseInt(timestamp, 16) * 1000).toUTCString()
    }
  },
  methods: {
    edit () {
      eventBus.editEntity(this.document._id, 'appEditDocument')
    },
    download () {
      let a = document.createElement('A')
      a.href = `/public/documents/${this.document.directory}`
      a.download = this.document.name
      a.click()
    },
    view () {
      window.open(`/public/documents/${this.document.directory}`, '_blank')
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
.document {

    &-header {
        text-align: left;
        display: table;
        width: 100%;

        .col-1-of-1 {
            position: relative;
        }

        &__menu {
            position: absolute;
            cursor: pointer;
            top: 0;
            right: 0;

            span {
                display: block;
                padding: 0.5rem 1rem;
                transition: all 0.2s ease-in-out;

                &:hover {
                    transform: rotate(180deg);
                }

            }
        }

        span:nth-child(1),
        span:nth-child(3) {
            font-weight: 500;
        }

        &__img {
            display: inline-block;
            height: 5rem;
            width: 5rem;
            // border-radius: 100%;
            border-radius: 0.25rem;
            overflow: hidden;
            vertical-align: middle;

            img {
                height: 100%;
            }
        }

        &__info {
            display: inline-block;
            vertical-align: middle;
            width: calc(100% - 10rem);
            padding-left: 1.5rem;

            &--head {
                vertical-align: middle;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                margin-bottom: 0.5rem;

                span {
                    font-weight: 400;

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
                color: $color-grey-1;
            }
        }
    }

    &-info {
        text-align: justify;

        &__description {
            color: $color-grey-1;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            height: $font-default-3*$line-height-default*$lines-to-show;
            font-size: $font-default-3;
            line-height: $line-height-default;
            -webkit-line-clamp: $lines-to-show;
            -webkit-box-orient: vertical;
            // padding-right: 2rem;
            // padding-left: 6.5rem;
            // @include respond(phone) {
            //     padding-left: 0;
            // }
            @include respond(tab-lan) {
                height: auto;
            }
        }
    }

    &-footer {

        &__info {
            text-align: left;
            // padding-left: 6.5rem;
            // @include respond(phone) {
            //     padding-left: 0;
            // }

            li {
                padding: 0.5rem 1rem;
                border-radius: 10rem;
                display: inline-block;
                text-overflow: ellipsis;
                overflow: hidden;
                max-width: 30%;
                white-space: nowrap;
                color: $color-white;

                &:not(:first-child) {
                    margin-left: 0.5rem;
                }
            }
        }
    }

}
</style>
