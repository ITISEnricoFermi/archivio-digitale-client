<template>
<div class="menu-header-container">
  <ul class="menu-header-container__main">
    <router-link tag="li" to="/dashboard/" class="menu-header-container__li" active-class="menu-header-container__li--active">
      <span><i class="fas fa-tachometer-alt"></i></span>
      <span>Dashboard</span>
    </router-link>
    <router-link tag="li" to="/search/" class="menu-header-container__li" active-class="menu-header-container__li--active">
      <span><i class="fa fa-search" aria-hidden="true"></i></span>
      <span>Ricerca</span>
    </router-link>
    <router-link tag="li" to="/upload/" class="menu-header-container__li" active-class="menu-header-container__li--active">
      <span><i class="fas fa-pencil-alt"></i></span>
      <span>Inserisci</span>
    </router-link>
    <router-link tag="li" to="/admin/" class="menu-header-container__li" active-class="menu-header-container__li--active" v-if="privileges._id == 'admin'">
      <span><i class="fa fa-user-secret" aria-hidden="true"></i></span>
      <span>Admin</span>
    </router-link>
    <router-link tag="li" to="/user/" class="menu-header-container__li" active-class="menu-header-container__li--active">
      <span><i class="fa fa-user" aria-hidden="true"></i></span>
      <span>Profilo</span>
    </router-link>
    <router-link tag="li" to="/settings/" class="menu-header-container__li" active-class="menu-header-container__li--active">
      <span><i class="fa fa-cog" aria-hidden="true"></i></span>
      <span>Impostazioni</span>
    </router-link>
    <router-link tag="li" to="/logout/" class="menu-header-container__li" active-class="menu-header-container__li--active">
      <span><i class="fas fa-sign-out-alt"></i></span>
      <span>Logout</span>
    </router-link>
  </ul>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'menuMobile',
  props: ['privileges']
}
</script>

<style scoped lang="scss">
.menu-header-container {
    background-color: $color-primary;
    height: calc(100vh - 6rem);
    width: 100%;
    position: fixed;
    top: 6rem;
    z-index: 10000;
    overflow: hidden;
    display: none;

    @include respond(tab-lan) {
        display: block;
    }

    &__main {
        top: 0;
        width: 100%;
        padding: 0;
        margin: 0;
        text-align: center;
        position: absolute;
        @include absCenter;
    }

    &__li {
        color: $color-white;
        padding: 2rem;
        width: 100%;
        display: block;
        font-weight: bold;
        cursor: pointer;

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
