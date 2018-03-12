<template>
<div class="menu-header-container">
  <ul class="menu-header-container__main">
    <li class="menu-header-container__li menu-header-container__li--active" data-tab="panel__dashboard" @click.stop="changePanel('appPanelDashboard')">
      <span><i class="fas fa-tachometer-alt"></i></span>
      <span>Dashboard</span>
      <span class="menu-header-container__li-tag u-bg-color-red">Disattivato</span>
    </li>
    <li class="menu-header-container__li" data-tab="panel__search" @click.stop="changePanel('appPanelSearch')">
      <span><i class="fa fa-search" aria-hidden="true"></i></span>
      <span>Ricerca</span>
      <span class="menu-header-container__li-tag u-bg-color-red">Disattivato</span>
    </li>
    <li class="menu-header-container__li" data-tab="panel__upload" @click.stop="changePanel('appPanelUpload')">
      <span><i class="fas fa-pencil-alt"></i></span>
      <span>Inserisci</span>
      <span class="menu-header-container__li-tag u-bg-color-red">Disattivato</span>
    </li>
    <li class="menu-header-container__li" data-tab="panel__admin" @click.stop="changePanel('appPanelAdmin')" v-if="privileges == 'admin'">
      <span><i class="fa fa-user-secret" aria-hidden="true"></i></span>
      <span>Admin</span>
      <span class="menu-header-container__li-tag u-bg-color-yellow">Beta</span>
    </li>
    <li class="menu-header-container__li" data-tab="panel__profile" @click.stop="changePanel('appPanelProfile')">
      <span><i class="fa fa-user" aria-hidden="true"></i></span>
      <span>Profilo</span>
      <span class="menu-header-container__li-tag u-bg-color-green">Attivo</span>
    </li>
    <li class="menu-header-container__li" data-tab="panel__settings" @click.stop="changePanel('appPanelSettings')">
      <span><i class="fa fa-cog" aria-hidden="true"></i></span>
      <span>Impostazioni</span>
      <span class="menu-header-container__li-tag u-bg-color-green">Attivo</span>
    </li>
    <li class="menu-header-container__li" data-tab="panel--logout" @click.stop="logout">
      <span><i class="fas fa-sign-out-alt"></i></span>
      <span>Logout</span>
      <span class="menu-header-container__li-tag u-bg-color-green">Attivo</span>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: "menuMobile",
  props: ["privileges"],
  methods: {
    changePanel(panel) {

      document.getElementsByClassName("menu-header-container__li--active")[0].classList.remove("menu-header-container__li--active");

      if (event.srcElement.tagName == "LI") {
        event.target.classList.add("menu-header-container__li--active");
      } else {
        event.srcElement.parentNode.classList.add("menu-header-container__li--active");
      }

      this.$emit("panelChanged", panel);
    },
    logout() {
      window.location.replace("/logout");
    }
  }
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
        font-size: $font-default-2;
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
