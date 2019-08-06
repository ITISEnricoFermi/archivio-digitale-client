<template>
<div class="search">
  <input type="text" class="search__bar" placeholder="Cerca documenti, foto e video..." autocomplete="off" v-model="query" @keyup.enter="search">
</div>
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      query: undefined
    }
  },
  methods: {
    search () {
      if (this.query) {
        window.location.replace('/home/search?q=' + this.query)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.search {
    width: 50%;

    &__bar {
        padding: 2vh;
        border: none;
        border-radius: 0.25rem;
        background-color: white;
        box-shadow: 0 0.25rem 0.75rem rgba(black, 0.1);
        width: 100%;
        outline: none;
        font-size: $font-default-3;

        &:focus {
            box-shadow: 0 0.25rem 0.75rem rgba(black, 0.1);

        }

    }

}
</style>
