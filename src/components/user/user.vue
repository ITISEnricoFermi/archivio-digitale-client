<template>
<div class="module user">
  <div class="row">
    <div class="col-1-of-1">
      <div class="content">
        <div class="img">
          <img class="author-img" sizes="8rem" :srcset="'/pics/' + localUser._id + '/xs.jpeg 100w, /pics/' + localUser._id + '/sm.jpeg 300w, /pics/' + localUser._id + '/md.jpeg 500w, /pics/' + localUser._id + '/lg.jpeg 800w, /pics/' + localUser._id + '/xlg.jpeg 1200w'"
            :alt="localUser.firstname + ' ' + localUser.lastname">
        </div>
        <div class="info">
          <div class="info__content">
            <p class="name u-margin-bottom-small">{{localUser.firstname}} {{localUser.lastname}}</p>
            <p class="email u-margin-bottom-medium"><span></span>{{localUser.email}}</p>
            <ul class="tags">
              <li class="tag u-noselect">
                <span class="icon">
                  <i class="fas fa-tag"></i>
                </span>
                <span class="crop">{{localUser.privileges.privilege}}</span>
              </li>
              <li class="tag u-noselect">
                <span class="icon">
                  <i class="fas fa-tag"></i>
                </span>
                <span class="crop">{{localUser.state === 'active' ? 'Attivo' : 'Disattivato'}}</span>
              </li>
              <li class="tag u-noselect" v-for="(tag, index) in user.accesses.slice(0, 3)" :key="index">
                <span class="icon">
                  <i class="fas fa-tag"></i>
                </span>
                <span class="crop">{{tag.subject}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="actions-menu" @mouseleave="closeMenu">
          <span class="u-noselect" @click="menu = !menu">
            <i class="fas fa-ellipsis-h"></i>
          </span>
          <transition name="fade">
            <app-menu v-if="menu" :own="user.own" @edit="edit"></app-menu>
          </transition>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import eventBus from '@/utils/eventBus'

import Menu from './menu'

export default {
  name: 'user',
  props: ['user'],
  data () {
    return {
      menu: false
    }
  },
  computed: {
    localUser () {
      return this.user
    }
  },
  sockets: {
    userUpdated (user) {
      if (user._id === this.user._id) {
        this.localUser = user // TODO: verificare il funzionamento
      }
    }
  },
  methods: {
    edit () {
      eventBus.openPopUp(this.user._id, 'appEditUser', 80)
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
.user {
    overflow: hidden;

    .content {
        text-align: left;
        width: 100%;
        position: relative;
        display: grid;
        grid-template-columns: 12rem auto;
        grid-template-rows: 12rem;
        grid-gap: 2rem;

        .img > img {
            height: 100%;
            border-top-left-radius: 0.25rem;
            border-bottom-left-radius: 0.25rem;
        }

        .info {
            display: flex;
            align-items: center;

            &__content {
                text-align: left;
                width: 100%;

                .name {
                    font-size: 1.8rem;
                    display: block;
                }

                .email {
                    display: block;
                    text-decoration: none;
                    color: $color-tertiary;
                    font-size: $font-default-3;
                }

                .tags {
                    padding: 0;
                    text-align: left;
                    display: block;
                    width: 100%;
                    font-size: $font-default-2;
                }

            }

        }

        .actions-menu {
            position: absolute;
            cursor: pointer;
            top: 1.5rem;
            right: 1.5rem;

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
