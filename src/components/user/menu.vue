<template>
<div class="menu">
  <ul>
    <li class="u-noselect" v-if="own" @click="edit"><span><i class="fas fa-edit"></i></span>Modifica</li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'actionsMenu',
  props: {
    own: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    edit () {
      this.$emit('edit')
    }
  }
}
</script>

<style scoped lang="scss">
.menu {
    position: absolute;
    border-radius: 0.25rem;
    background-color: var(--color-surface-primary);
    box-shadow: 0 0.25rem 0.75rem rgba(black, 0.5);
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
                border-bottom: 1px solid var(--color-neutral-third);
            }

            &:hover {
              background-color: var(--color-surface-secondary);
            }

            span {
                margin: 0.5rem;
            }
        }
    }
}
</style>
