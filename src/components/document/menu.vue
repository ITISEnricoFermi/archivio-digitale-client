<template>
<div class="menu">
  <ul>
      <li class="u-noselect" v-if="own" @click="edit"><span><i class="fas fa-edit"></i></span>Modifica</li>
    <li class="u-noselect" @click="download"><span><i class="fas fa-download"></i></span>Scarica</li>
    <li class="u-noselect" @click="view"><span><i class="fas fa-eye"></i></span>Visualizza</li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'actionsMenu',
  props: ['own'],
  methods: {
    edit () {
      this.$emit('edit')
    },
    download () {
      this.$emit('download')
    },
    view () {
      this.$emit('view')
    }
  }
}
</script>

<style scoped lang="scss">
.menu {
    position: absolute;
    border-radius: 0.25rem;
    background-color: $color-white;
    box-shadow: 0 0.25rem 0.75rem rgba($color-black, 0.5);
    right: 0;
    width: 15rem;
    text-align: left;
    overflow: hidden;
    ul {
        padding: 0;
        li {
            list-style: none;
            padding: 1rem;
            cursor: pointer;

            &:not(:last-child) {
                border-bottom: 1px solid $color-white-5;
            }

            &:hover {
              background-color: $color-white-1;
            }

            span {
                margin: 0.5rem;
            }
        }
    }
}
</style>
