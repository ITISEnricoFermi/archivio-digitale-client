<template>
<aside class="menu-left">
  <header class="menu-left__header">
    <img src="/static/logo/itisFermi_white.svg" class="menu-left__logo" alt="ITIS Enrico Fermi">
  </header>
  <ul class="menu-left__main">
    <li class="menu-left__li menu-left__li--active" data-tab="panel__dashboard" @click="changePanel($event, 'appPanelDashboard')">
      <span><i class="fas fa-tachometer-alt"></i></span>
      <span>Dashboard</span>
      <!-- <span class="menu-left__li-tag u-bg-color-red">Disattivo</span> -->
    </li>
    <li class="menu-left__li" data-tab="panel__search" @click.stop="changePanel($event, 'appPanelSearch')">
      <span><i class="fa fa-search" aria-hidden="true"></i></span>
      <span>Ricerca</span>
    </li>
    <li class="menu-left__li" data-tab="panel__upload" @click.stop="changePanel($event, 'appPanelUpload')">
      <span><i class="fas fa-pencil-alt"></i></span>
      <span>Inserisci</span>
    </li>
    <li class="menu-left__li" data-tab="panel__admin" @click.stop="changePanel($event, 'appPanelAdmin')" v-if="privileges._id == 'admin'">
      <span><i class="fa fa-user-secret" aria-hidden="true"></i></span>
      <span>Admin</span>
    </li>
    <li class="menu-left__li" data-tab="panel__profile" @click.stop="changePanel($event, 'appPanelProfile')">
      <span><i class="fa fa-user" aria-hidden="true"></i></span>
      <span>Profilo</span>
    </li>
    <li class="menu-left__li" data-tab="panel__settings" @click.stop="changePanel($event, 'appPanelSettings')">
      <span><i class="fa fa-cog" aria-hidden="true"></i></span>
      <span>Impostazioni</span>
    </li>
    <li class="menu-left__li" data-tab="panel--logout" @click="logout">
      <span><i class="fas fa-sign-out-alt"></i></span>
      <span>Logout</span>
    </li>
  </ul>
  <footer class="menu-left__footer">
    Powered By
    <a href="https://www.riccardosangiorgio.com" class="menu-left__footer--a" target="_blank">Riccardo Sangiorgio</a>
  </footer>
</aside>

</template>

<script>

import axios from 'axios'

export default {
  name: 'menuLeft',
  props: ['privileges'],
  methods: {
    changePanel (event, panel) {
      document.getElementsByClassName('menu-left__li--active')[0].classList.remove('menu-left__li--active')

      if (event.target.tagName === 'LI') {
        event.target.classList.add('menu-left__li--active')
      } else {
        event.target.parentNode.classList.add('menu-left__li--active')
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
.menu-left {
  background-color: $color-primary;
  position: fixed;
  box-shadow: 0 0.25rem 0.75rem rgba($color-black, 0.5);
  width: 25rem;
  height: 100%;
  z-index: 9998;

  @include respond(tab-lan) {
    display: none;
  }

  &__header {
    display: table;
    width: 100%;
    padding: 5rem;
    .menu-left__logo {
      width: 90%;
      display: table-cell;
      vertical-align: middle;
      margin: 0 auto;
    }
  }

  &__main {
    .menu-left__li {
      color: $color-white;
      padding: 2rem;
      width: 100%;
      display: block;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.1s;

      * {
        cursor: pointer;
      }

      &--active,
      &:hover {
        background-color: $color-secondary;
      }

      span:first-child {
        margin: 1rem;
      }

      &-tag {
        padding: 0.2rem 0.5rem;
        border-radius: 10rem;
        font-size: 1rem;
        color: $color-white;
        margin-left: 1rem;
        text-transform: uppercase;
      }
    }
  }

  &__footer {
    font-size: $font-default-3;
    color: $color-white;
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    padding: 2rem;
    width: 100%;

    &--a {
      color: $color-white;
    }
  }
}
</style>
