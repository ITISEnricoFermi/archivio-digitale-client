<template>
<div class="module">
  <div class="row">
    <div class="col-1-of-1">
      <div class="user">
        <div class="user__left">
          <img :src="'/pics/' + localUser.img" class="user-img" :alt="localUser.firstname + ' ' + localUser.lastname">
          <div class="user-info">
            <p class="user-name u-margin-bottom-small">{{localUser.firstname}} {{localUser.lastname}}</p>
            <p class="user__privileges u-margin-bottom-small"></p>
            <a v-bind:href="`mailto:${localUser.email}`" class="user-email u-margin-bottom-medium"><span></span>{{localUser.email}}</a>
            <ul class="user-tag">
              <li class="u-bg-color-blue">{{localUser.privileges.privilege}}</li>
              <li class="u-bg-color-green">{{localUser.state === 'active' ? 'Attivo' : 'Disattivato'}}</li>
              <li class="u-bg-color-yellow" v-for="(tag, index) in user.accesses.slice(0, 3)" :key="index">{{tag.subject}}</li>
            </ul>
          </div>
        </div>
        <div class="user__right">
          <ul>
            <li class="u-noselect">
              <a @click.prevent="editUser(user._id)">
                  <i class="fas fa-edit"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'

import {
  eventBus
} from '@/main'

export default {
  name: 'user',
  props: ['user'],
  data: () => {
    return {
      localUser: this.user
    }
  },
  created () {
    this.localUser = this.user
  },
  sockets: {
    userUpdated (user) {
      if (user._id === this.user._id) {
        this.localUser = user
      }
    }
  },
  methods: {
    editUser (id) {
      eventBus.editEntity(id, 'appEditUser')
    },
    async togglePrivileges (id) {
      try {
        let user = (await axios.post('/admin/togglePrivileges', {
          _id: id
        })).data
        if (user) {
          this.localUser = user
          this.$socket.emit('userUpdated', user)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async toggleState (id) {
      let user = (await axios.post('/admin/toggleState/', {
        _id: id
      })).data
      if (user) {
        this.localUser = user
        this.$socket.emit('userUpdated', user)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.user {
    display: grid;
    grid-template-columns: auto 4rem;
    grid-template-rows: 8rem;
    grid-template-areas: "left right";
    grid-gap: 2vh;

    &__left {
        grid-area: left;
        text-align: left;

        &>* {
          display: inline-block;
        }

        .user-img {
          height: 100%;
          max-width: 100%;
          // -webkit-clip-path: circle(50% at 50% 50%);
          // clip-path: circle(50% at 50% 50%);
          border-radius: 0.25rem;
        }

        .user-info {
          vertical-align: top;
          text-align: left;
          margin-left: 3vh;
          width: 80%;

          @include respond(tab-por) {
            width: 70%;
          }
          .user-name {
            font-size: 1.8rem;
            display: block;
          }

          .user-email {
            display: block;
            text-decoration: none;
            color: $color-tertiary;
            font-size: $font-default-2;
          }

          .user-tag {
                  text-align: left;
                  width: 100%;
                  @include respond(tab-por) {
                      display: none;
                  }

                  li {
                      padding: 0.5rem 1rem;
                      border-radius: 10rem;
                      display: inline-block;
                      text-overflow: ellipsis;
                      overflow: hidden;
                      max-width: 20%;
                      white-space: nowrap;
                      color: $color-white;

                      &:not(:first-child) {
                          margin-left: 0.5rem;
                      }
                  }
          }

        }
    }

    &__right {
        grid-area: right;

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
