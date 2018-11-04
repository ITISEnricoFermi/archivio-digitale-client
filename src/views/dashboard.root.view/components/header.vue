<template>
  <div class="header">
    <p class="heading heading-primary">Dashboard</p>
    <p class="more u-select" @click="loadmore">
      <i class="far fa-caret-square-down"></i>
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      page: 2
    }
  },
  methods: {
    loadmore () {
      this.$emit('loadmore', this.page)
      this.page++
    }
  },
  sockets: {
    async newDocument () {
      this.page = 1
      this.emit('loadmore', this.page)
    },
    async documentDeleted () {
      this.page = 1
      this.emit('loadmore', this.page)
    },
    async documentUpdated () {
      this.page = 1
      this.emit('loadmore', this.page)
    }
  }
}
</script>

<style scoped lang="scss">
  .header {
    box-shadow: 0 0.25rem 0.75rem rgba($color-black, 0.05);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fcfcfc;
    padding: 3rem;


    .heading {
      font-weight: bold;
    }

    .more {
      font-size: 2rem;
      cursor: pointer;
      text-shadow: 0 1px 2px rgba(10,10,10, 0.1);
      transition: all 0.2s ease-in-out;
      padding: 0.5rem 1rem;
      // 
      // &:hover {
      //   background-color: $color-white-2;
      // }
    }
  }
</style>
