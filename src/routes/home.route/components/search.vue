<template>
<div class="search">
  <input type="text" class="search__bar" placeholder="Cerca nell'Archivio..." autocomplete="off" v-model="query" @keyup.enter="search">
  <div class="icon">
    <i class="fas fa-search"></i>
  </div>
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
  created () {
    this.query = this.$route.query.fulltext
  },
  methods: {
    search () {
      if (this.query) {
        window.location.replace('/home/search?fulltext=' + this.query)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.search {
    position: relative;

    &__bar {
        padding: 1rem;
        border: none;
        border-radius: 0.25rem;
        background-color: lighten(#2d303a, 5%);
        box-shadow: 0 0.25rem 0.75rem rgba(black, 0.1);
        width: 100%;
        outline: none;
        font-size: 2rem;
        font-weight: 700;
        color: white;
        padding-left: 4.5rem;

        &:focus {
            box-shadow: 0 0.25rem 0.75rem rgba(black, 0.1);

        }

        &::placeholder {
          color: #9ca0b1;
        }

    }

    .icon {
      font-size: 2rem;
      position: absolute;
      margin: 1rem 1.5rem;
      top: 0;
      left: 0;
      color: #9ca0b1;
    }

}
</style>
