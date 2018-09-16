<template>
<div class="search">
  <input type="text" class="search__bar" placeholder="Cerca documenti, foto e video..." autocomplete="off" v-model="query" @keyup.enter="search">
</div>
</template>

<script>
export default {
  name: 'search',
  data: () => {
    return {
      query: undefined
    }
  },
  methods: {
    search () {
      if (this.query) {
        window.location.replace('/search?q=' + this.query)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.search {
    width: 50%;
    position: absolute;
    @include absCenter;

    @include respond(phone) {
        width: 70%;
    }

    &__bar {
        padding: 2vh;
        border: none;
        border-radius: 0.25rem;
        background-color: $color-white;
        box-shadow: 0 0.25rem 0.75rem rgba($color-black, 0.05);
        width: 100%;
        outline: none;
        font-size: $font-default-3;

        &:focus {
            box-shadow: 0 0.25rem 0.75rem rgba($color-black, 0.1);
        }

    }

}
</style>
