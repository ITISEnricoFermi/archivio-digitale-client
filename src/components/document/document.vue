<template>
<div class="module document-box">
  <div class="document-box-header">
    <div class="document-box-header__img">
      <img v-bind:src="'pics/' + document.author.img" alt="Foto profilo utente">
    </div>
    <div class="document-box-header__info">
      <p class="document-box-header__info--head heading-fourth">
        <span>{{document.author.firstname}} {{document.author.lastname}}</span>
        <span> ha pubblicato</span>
        <span>{{document.name}}</span>.
      </p>
      <p class="document-box-header__info--date heading-fifth">{{ this.date }}
      </p>
    </div>
  </div>
  <div class="document-box-info">
    <p class="document-box-info__description">{{document.description}}</p>
  </div>
  <div class="document-box-footer">
    <ul class="document-box-footer__info">
      <li v-if="document.subject" class="u-bg-color-blue">{{document.subject.subject}}</li>
      <li v-if="document.class || document.section" class="u-bg-color-yellow">
        <span v-if="document.class">{{document.class.class}}</span>
        <span v-if="document.section">{{document.section.section}}</span>
      </li>
      <li v-if="document.type" class="u-bg-color-green">{{document.type.type}}</li>
    </ul>
  </div>
  <div class="document-box-left">
    <ul>
      <li class="u-noselect">
        <a v-bind:href="'/public/documents/' + document.directory" download>
          <i class="fas fa-download"></i>
        </a>
      </li>
      <li class="u-noselect">
        <a v-bind:href="'/public/documents/' + document.directory" target="_blank">
          <i class="fas fa-eye"></i>
        </a>
      </li>
      <li class="u-noselect">
        <a v-if="document.own" @click.prevent="editDocument(document._id)">
          <i class="fas fa-edit"></i>
        </a>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import {
  eventBus
} from '@/main'

export default {
  name: 'document',
  props: ['document'],
  computed: {
    date: function () {
      let timestamp = this.document._id.toString().substring(0, 8)
      return new Date(parseInt(timestamp, 16) * 1000).toUTCString()
    }
  },
  methods: {
    editDocument (id) {
      eventBus.editEntity(id, 'appEditDocument')
    }
  }
}
</script>

<style scoped lang="scss">
.document-box {
    display: grid;
    grid-template-columns: auto 4rem;
    grid-template-rows: auto 2fr auto;
    grid-template-areas: "header left" "info left" "footer left";
    grid-gap: 2vh;

    &-header {
        grid-area: header;
        text-align: left;
        display: table;
        width: 100%;

        span:nth-child(1),
        span:nth-child(2) {

            @include respond(phone) {
                display: none;
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
            border-radius: 100%;
            overflow: hidden;
            vertical-align: middle;

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

                span {
                    font-weight: 400;
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
        grid-area: info;
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
            padding-right: 2rem;
            padding-left: 6.5rem;
            @include respond(phone) {
                padding-left: 0;
            }
            @include respond(tab-lan) {
                height: auto;
            }
        }
    }

    &-footer {
        grid-area: footer;

        &__info {
            text-align: left;
            padding-left: 6.5rem;
            @include respond(phone) {
                padding-left: 0;
            }

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

    &-left {
        grid-area: left;

        ul {
            li {
                display: block;

                &:not(:last-child) {
                    margin-bottom: 1.5vh;
                }

                a {
                    display: block;
                    text-decoration: none;
                    color: $color-tertiary;
                    text-align: center;
                    width: 100%;
                    padding: 1rem;
                    border-radius: 0.3rem;
                    cursor: pointer;
                    transition: all 0.2s ease-in-out;
                    box-shadow: 0 0 0.5rem rgba($color-black, 0.2);

                    &:hover {
                        box-shadow: 0 0 0.7rem rgba($color-black, 0.3);
                    }
                }
            }
        }
    }
}
</style>
