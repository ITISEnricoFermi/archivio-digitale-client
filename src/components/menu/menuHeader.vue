<template>
<header class="menu-header u-noselect">
  <img src="static/logo/itisFermi_white.svg" class="menu-header__logo" alt="ITIS Enrico Fermi">
  <p class="menu-header__bar" @click="changeMenu"><i class="fas fa-bars"></i></p>
</header>
</template>

<script>
export default {
  name: "menuHeader",
  methods: {
    changeMenu() {
      this.$emit("changeMenu");
    }
  }
}
</script>

<style scoped lang="scss">
</style>
