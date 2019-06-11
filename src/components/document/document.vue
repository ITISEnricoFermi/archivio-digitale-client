<template>
<div class="module module--padded document" @click="more">
  <div class="header">
    <p class="title heading-tertiary">{{ document.name }}</p>
    <p class="description heading-fourth"></p>
    <p class="date">{{ this.date }}</p>
    <div class="authors">
      <router-link :to="'/user/' + document.author._id" tag="div" class="author">
        <img sizes="5rem" :srcset="'/static/pics/' + document.author._id + '/xs 100w, /static/pics/' + document.author._id + '/sm 300w, /static/pics/' + document.author._id + '/md 500w, /static/pics/' + document.author._id + '/lg 800w, /static/pics/' + document.author._id + '/xlg 1200w'"
          :alt="document.author.firstname + ' ' + document.author.lastname">
      </router-link>
    </div>
    <div class="menu-container" @mouseleave="closeMenu">
      <span class="u-noselect" @click="menu = !menu">
        <i class="fas fa-ellipsis-h"></i>
      </span>
      <transition name="fade">
        <app-menu v-if="menu" :editable="document.editable" @edit="edit" @download="download" @view="view"></app-menu>
      </transition>
    </div>
  </div>
</div>
</template>

<script>
import eventBus from '@/utils/eventBus'

import Menu from './menu'

export default {
  props: ['document'],
  data () {
    return {
      menu: false
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
      let type = this.document.mimetype.split('/')[0]
      if (type === 'video') {
        return eventBus.openPopUp(this.document, 'appVideo', 70)
      }
      window.open(`/files/${this.document._id}`, '_blank')
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0!important !important;

    &:not(:last-child) {
      border-bottom: 1px solid $color-white-5;
    }

    &:hover {
        background-color: #f3f5f2;

        @include color-scheme(dark) {
            background-color: rgba($color-white, 0.2);
        }
    }

    & > div {
        width: 100%;
    }

    .header {
        text-align: left;
        position: relative;

        .title {
            font-weight: bold;
            margin-bottom: 1.5rem;
        }

        .date {
            color: $color-white-6;
            margin-bottom: 1.5rem;
        }

        .authors {
            .author {
                border-radius: 100rem;
                overflow: hidden;
                height: 5rem;
                width: 5rem;
                cursor:pointer;

                img {
                    height: 100%;
                }
            }
        }
    }

    // &-header {
    //     text-align: left;
    //     display: table;
    //     width: 100%;
    //     float: right;
    //      position: absolute;
    //         top: 0;
    //         right: 0;

    .menu-container {
        position: absolute;
        top: 0;
        right: 0;

        cursor: pointer;
        z-index: 1000;

        span {
            display: block;
            padding: 0.5rem 1rem;
            transition: all 0.2s ease-in-out;

            &:hover {
                transform: rotate(180deg);
            }

        }
        // }

        span:not(:nth-child(2)) {
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
