<template>
  <div class="search">
    <input class="search__bar" type="text" placeholder="Cerca documenti, foto e video..." autocomplete="off">
  </div>
</template>

<script>
export default {
  name: 'search'
}
</script>

<style scoped lang="scss">

.search {
  width: 50%;
  position: absolute;
  @include absCenter;

  &__bar {
    padding: 2vh;
    border: none;
    border-radius: 0.25rem;
    background-color: $color-white;
    box-shadow: 0 0.25rem 0.75rem rgba($color-black, 0.05);
    width:100%;
    outline: none;

    &:focus {
      box-shadow: 0 0.25rem 0.75rem rgba($color-black, 0.1);
    }
  }

}
</style>
