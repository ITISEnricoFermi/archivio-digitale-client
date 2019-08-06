<template>
  <div class="multiple-select-results">
    <ul>
      <li class="u-noselect" v-for="(result, index) in selected" :key="index" @click="remove($event, result)">
          <span class="result" v-for="(element, index) in dbElements" :key="index">
              {{ result[element] }}&#160;
          </span>
          <span class="remove">
            <i class="fas fa-times-circle"></i>
          </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'multipleSelectResults',
  props: {
    selected: Array,
    dbElements: Array
  },
  methods: {
    remove (event, element) {
      this.selected.splice(this.selected.indexOf(element), 1)
      this.$emit('update:selected', this.selected)
    }
  }
}
</script>

<style scoped lang="scss">
.multiple-select-results {
  border-radius: 0.25rem;
  background-color: var(--color-surface-secondary);
  border: 1px solid var(--color-neutral-third);

  ul {
    padding: 0;

    li {
      list-style: none;
      font-size: $font-default-2;
      padding: 0.9rem 0.8rem;
      cursor: pointer;
      text-align: left;
      position: relative;
      color: var(--color-text-primary);

      &:not(:last-child) {
        border-bottom: 1px solid darken($color-white-5, 5%);
      }

      &:hover {
        background-color: var(--color-neutral-third);
      }

      .result {
        max-width: calc(100% - 2rem);
        display: inline-block;
      }

      .remove {
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        color: var(--color-text-secondary);
      }
    }
  }
}
</style>
