<template>
<header class="menu-white">
  <div class="menu-white__logo">
    <img src="/static/logo/itisFermi.svg" alt="ITIS Enrico Fermi">
  </div>
  <div class="menu-white__main">
    <ul>
      <li class="menu-white__li menu-white__li--active" data-tab="panel__dashboard" @click="changePanel($event, 'appPanelDashboard')">
        <span><i class="fas fa-tachometer-alt"></i></span>
        <span>Dashboard</span>
        <!-- <span class="menu-white__li-tag u-bg-color-red">Disattivo</span> -->
      </li>
      <li class="menu-white__li" data-tab="panel__search" @click.stop="changePanel($event, 'appPanelSearch')">
        <span><i class="fa fa-search" aria-hidden="true"></i></span>
        <span>Ricerca</span>
      </li>
      <li class="menu-white__li" data-tab="panel__upload" @click.stop="changePanel($event, 'appPanelUpload')">
        <span><i class="fas fa-pencil-alt"></i></span>
        <span>Inserisci</span>
      </li>
      <li class="menu-white__li" data-tab="panel__admin" @click.stop="changePanel($event, 'appPanelAdmin')" v-if="privileges._id == 'admin'">
        <span><i class="fa fa-user-secret" aria-hidden="true"></i></span>
        <span>Admin</span>
      </li>
      <!-- <li class="menu-white__li" data-tab="panel__profile" @click.stop="changePanel($event, 'appPanelProfile')">
      <span><i class="fa fa-user" aria-hidden="true"></i></span>
      <span>Profilo</span>
    </li>
    <li class="menu-white__li" data-tab="panel__settings" @click.stop="changePanel($event, 'appPanelSettings')">
      <span><i class="fa fa-cog" aria-hidden="true"></i></span>
      <span>Impostazioni</span>
    </li>
    <li class="menu-white__li" data-tab="panel--logout" @click="logout">
      <span><i class="fas fa-sign-out-alt"></i></span>
      <span>Logout</span>
    </li> -->
    </ul>
  </div>
  <div class="menu-down">
    <div class="menu-top">
      <div class="img">
        <img :src="'/pics/' + user.img" :alt="user.firstname + ' ' + user.lastname" @click="menu = !menu">
        <!-- <p>{{user.firstname + user.lastname}}></p> -->
      </div>
    </div>
    <transition name="fade">
      <div class="menu" v-if="menu">
        <ul>
          <li class="menu-down__li" data-tab="panel__profile" @click.stop="changePanel($event, 'appPanelProfile')">
            <span><i class="fa fa-user" aria-hidden="true"></i></span>
            <span>Profilo</span>
          </li>
          <li class="menu-down__li" data-tab="panel__settings" @click.stop="changePanel($event, 'appPanelSettings')">
            <span><i class="fa fa-cog" aria-hidden="true"></i></span>
            <span>Impostazioni</span>
          </li>
          <li class="menu-down__li" data-tab="panel--logout" @click="logout">
            <span><i class="fas fa-sign-out-alt"></i></span>
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</header>
</template>

<script>
import axios from 'axios'

export default {
  name: 'menuLeft',
  props: ['privileges', 'user'],
  data: () => {
    return {
      menu: false
    }
  },
  methods: {
    changePanel (event, panel) {
      document.getElementsByClassName('menu-white__li--active')[0].classList.remove('menu-white__li--active')

      if (event.target.tagName === 'LI') {
        event.target.classList.add('menu-white__li--active')
      } else {
        event.target.parentNode.classList.add('menu-white__li--active')
      }

      this.$emit('panelChanged', panel)
    },
    async logout () {
      await axios.get('/logout')
      window.location.reload()
    }
  }
}
</script>

<style scoped lang="scss">
.menu-white {
    background-color: $color-white;
    border-bottom: 1px solid $color-white-5;
    font-weight: 500;
    box-shadow: 0 0.25rem 0.75rem rgba($color-black, 0.05);
    width: 100%;
    z-index: 9998;
    display: table;
    grid-area: menu;

    @include respond(tab-lan) {
        display: none;
    }

    &__logo {
        height: 4.5rem;
        display: table-cell;
        vertical-align: middle;

        img {
            height: 100%;
            margin: 0.5rem 2rem;
        }
    }

    &__main {
        display: table-cell;
        vertical-align: middle;
        padding: 0;

        ul {
            padding: 0;
            float: right;
            .menu-white__li {
                color: $color-grey-2;
                display: inline-block;
                padding: 2rem;
                font-size: $font-default-3;
                cursor: pointer;
                transition: all 0.1s;
                text-transform: uppercase;
                cursor: pointer;

                &--active,
                &:hover {
                    color: $color-fourth !important;
                }

                span:first-child {
                    margin: 1rem;
                    display: none;
                }
            }
        }

    }
}

.menu-down {
  display: table-cell;
  vertical-align: middle;
  width: 4rem;
    .menu-top {
        position: relative;

        .img {
          padding: 0 1rem;
            img {
                height: 4rem;
                border-radius: 0.25rem;
                cursor: pointer;
            }
        }
    }

    .menu {
        position: absolute;
        background-color: $color-white;
        border: 1px solid $color-white-5;
        border-radius: 0.25rem;
        box-shadow: 0 0.25rem 0.75rem rgba($color-black, 0.5);
        top: 7rem;
        right: 1rem;
        width: 14rem;
        text-align: left;
        overflow: hidden;
        font-size: $font-default-3;

        ul {
            padding: 0;

            li {
                list-style: none;
                padding: 1rem;
                cursor: pointer;

                &:not(:last-child) {
                    border-bottom: 1px solid $color-white-5;
                }

                &:hover {
                    background-color: $color-white-1;
                }

                span {
                    margin: 0.5rem;
                }

            }
        }
    }
}
</style>
