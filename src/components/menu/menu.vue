<template>
<aside class="menu-left">
  <header class="menu-left__header">
    <img src="/logo/itisFermi_white.svg" class="menu-left__logo" alt="ITIS Enrico Fermi">
  </header>
  <ul class="menu-left__main">
    <router-link tag="li" class="menu-left__li" to="/dashboard/" active-class="menu-left__li--active">
      <span><i class="fas fa-tachometer-alt"></i></span>
      <span>Dashboard</span>
      <!-- <span class="menu-left__li-tag u-bg-color-red">Disattivo</span> -->
    </router-link>
    <router-link tag="li" class="menu-left__li" to="/search/" active-class="menu-left__li--active">
      <span><i class="fa fa-search" aria-hidden="true"></i></span>
      <span>Ricerca</span>
    </router-link>
    <router-link tag="li" class="menu-left__li" to="/upload/" active-class="menu-left__li--active">
      <span><i class="fas fa-pencil-alt"></i></span>
      <span>Inserisci</span>
    </router-link>
    <router-link tag="li" class="menu-left__li" to="/admin/" active-class="menu-left__li--active" v-if="privileges._id == 'admin'">
      <span><i class="fa fa-user-secret" aria-hidden="true"></i></span>
      <span>Admin</span>
    </router-link>
    <router-link tag="li" class="menu-left__li" :to="'/user/'" active-class="menu-left__li--active">
      <span><i class="fa fa-user" aria-hidden="true"></i></span>
      <span>Profilo</span>
    </router-link>
    <router-link tag="li" class="menu-left__li" to="/settings/" active-class="menu-left__li--active">
      <span><i class="fa fa-cog" aria-hidden="true"></i></span>
      <span>Impostazioni</span>
    </router-link>
    <router-link tag="li" class="menu-left__li" to="/logout/">
      <span><i class="fas fa-sign-out-alt"></i></span>
      <span>Logout</span>
    </router-link>
  </ul>
  <footer class="menu-left__footer">
    Powered By
    <a href="https://www.riccardosangiorgio.com" class="menu-left__footer--a" target="_blank">Riccardo Sangiorgio</a>
  </footer>
</aside>
</template>

<script>

export default {
  name: 'menuLeft',
  props: ['privileges']
}
</script>

<style scoped lang="scss">
.menu-left {
    background-image: linear-gradient($color-fourth, $color-primary);
    // background-image: linear-gradient(darken($color-fourth, 5%), $color-secondary);
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
            cursor: pointer!important;
            transition: all 0.1s;

            * {
                cursor: pointer;
            }

            &--active,
            &:hover {
                background-color: $color-primary;
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
