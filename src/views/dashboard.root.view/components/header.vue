<template>
<div class="header">
  <p class="heading heading-primary">Dashboard</p>
  <div class="options">
    <p class="option refresh u-noselect" @click="refresh">
      <i class="fas fa-sync-alt"></i>
    </p>
    <p class="option more u-noselect" @click="loadmore">
      <i class="far fa-caret-square-down"></i>
    </p>
  </div>
</div>
</template>

<script>
export default {
  methods: {
    loadmore() {
      this.$emit('action', 'loadmore')
    },
    refresh() {
      this.$emit('action', 'refresh')
    }
  },
  sockets: {
    newDocument() {
      this.$emit('action', 'loadmore')
    },
    documentDeleted() {
      this.$emit('action', 'loadmore')
    },
    documentUpdated() {
      this.$emit('action', 'loadmore')
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

    .options {
        .option {
            display: inline-block;
            text-align: right;

            &:not(:last-child) {
                margin-right: 1rem;
            }
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

        .refresh {
            cursor: pointer;
            text-shadow: 0 1px 2px rgba(10,10,10, 0.1);
            transition: all 0.2s ease-in-out;
            padding: 0.5rem 1rem;
            font-size: 1.5rem;

            &:active {
                transform: rotate(360deg);
            }
        }
    }

}
</style>
