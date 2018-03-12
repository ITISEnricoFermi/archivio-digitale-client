<template>
<header class="menu-header u-noselect">
  <img src="static/logo/itisFermi_white.svg" class="menu-header__logo" alt="ITIS Enrico Fermi">
  <p class="menu-header__bar" @click="changeMenu"><i class="fas fa-bars"></i></p>
</header>
</template>

<script>
export default {
  name: 'menuHeader',
  methods: {
    changeMenu () {
      this.$emit('changeMenu')
    }
  }
}
</script>

<style scoped lang="scss">
.menu-header {
  background-color: $color-primary;
  position: fixed;
  height: 6rem;
  width: 100%;
  top: 0;
  display: none;
  box-shadow: 0 0.25rem 0.75rem rgba($color-black, 0.5);
  z-index: 10000;

  @include respond(tab-lan) {
    display: block;
  }

  &__logo {
    height: 4.5rem;
    margin: 0.75rem 0.75rem 0.75rem 3vh;
  }

  &__bar {
    display: inline-block;
    float: right;
    font-size: 3.5rem;
    color: $color-white;
    margin: 1.2rem 3vh 1.2rem 1.5rem;
    cursor: pointer;
  }

}
</style>
