<template>
<div class="module collection-box">
  <div class="collection-box-header">
    <div class="collection-box-header__img">
      <img v-bind:src="'pics/' + collection.author.img" alt="Foto profilo utente">
    </div>
    <div class="collection-box-header__info">
      <p class="collection-box-header__info--head heading-fourth">
        <span>{{collection.author.firstname}} {{collection.author.lastname}}</span>
        <span> ha creato</span>
        <span>{{collection.documentCollection}}</span>.
      </p>
      <p class="collection-box-header__info--date heading-fifth">{{ this.date }}
      </p>
    </div>
  </div>
  <div class="collection-box-info">
    <!-- <p class="collection-box-info__description">{{document.description}}</p> -->
    <p v-if="collection.documents.length === 0">Nessun documento nella collezione.</p>
    <ul class="collection-box-info__documents" v-else>
      <li v-for="(document, index) in collection.documents">
        <a :href="'/documents/' + document.directory" target="_blank">
            {{index}}. <span>{{document.name}}</span>
          </a>
      </li>
    </ul>
  </div>
  <div class="collection-box-footer">
    <!-- <ul class="collection-box-footer__info">
        <li v-if="document.subject" class="u-bg-color-blue">{{document.subject.subject}}</li>
        <li v-if="document.class || document.section" class="u-bg-color-yellow">
          <span v-if="document.class">{{document.class.class}}</span>
          <span v-if="document.section">{{document.section.section}}</span>
        </li>
        <li v-if="document.type" class="u-bg-color-green">{{document.type.type}}</li>
      </ul> -->
  </div>
  <div class="collection-box-left">
    <ul>
      <li class="u-noselect" v-if="collection.own">
        <a @click.prevent="edit(collection._id)">
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
} from "@/main";

export default {
  name: "collection",
  props: ["collection"],
  created() {
    console.log(this.collection.documents);
  },
  computed: {
    date: function() {
      let timestamp = this.collection._id.toString().substring(0, 8);
      return new Date(parseInt(timestamp, 16) * 1000).toUTCString();
    }
  },
  methods: {
    edit(id) {
      eventBus.editEntity(id, "appEditCollection");
    }
  }
}
</script>

<style scoped lang="scss">
.collection-box {
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
            width: calc(100% - 5rem);
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

        p {
            padding-left: 6.5rem;
        }

        &__documents {
            padding-left: 6.5rem;

            li {
                list-style: none;
                display: block;
                font-size: 1.2rem;

                &:not(:last-child) {
                    margin-bottom: 2rem;
                }

                a {
                    text-decoration: none;
                    color: $color-black;
                    background-color: $color-white-5;
                    padding: 0.7rem;
                    border-radius: 0.5rem;

                    span {
                        text-decoration: underline;
                    }
                }
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
