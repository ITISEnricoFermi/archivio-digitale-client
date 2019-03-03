<template>
  <div class="multiple-select">
    <input type="text" class="textfield" :placeholder="placeholder" v-model="query" @keyup.enter="add(pointer)" @keyup.up="selectUp" @keyup.down="selectDown" @keyup="search($event)" >
    <div class="results">
      <ul>
        <li class="result" :class="{ 'result--selected': pointer == index ? true : false }" :value="result._id" v-for="(result, index) in results" :key="index" @click="add(index)">
          <span v-for="(element, index) in dbElements" :key="index">
              {{ result[element] }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import v1 from '@/utils/v1'

export default {
  name: 'multipleSelect',
  props: {
    placeholder: String,
    dbElements: Array,
    selected: {
      type: Array,
      default: () => {
        return []
      }
    },
    url: String
  },
  data: () => {
    return {
      query: undefined,
      results: [],
      pointer: 0
    }
  },
  methods: {
    async selectUp () {
      switch (this.pointer) {
        case 0:
          this.pointer = this.results.length - 1
          break
        default:
          this.pointer = this.pointer - 1
      }
    },
    async selectDown () {
      switch (this.pointer) {
        case this.results.length - 1:
          this.pointer = 0
          break
        default:
          this.pointer = this.pointer + 1
      }
    },
    async search (event) {
      if (!this.query) {
        this.results = []
        return false
      }

      try {
        let response = await v1.post(this.url, {
          query: this.query
        })

        this.results = response.data.filter(e => this.selected.findIndex(b => b._id === e._id) === -1)
      } catch (e) {
        console.log(e)
      }
    },
    async add (index) {
      try {
        if (this.results.length) {
          this.pointer = 0
          this.selected.push(this.results[index])
          this.query = undefined
          this.results = []
          this.$emit('update:selected', this.selected)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.multiple-select {
    width: 100%;
    margin: 0 auto;
    position: relative;

    .results {
        margin: 0;
        width: 100%;
        max-height: 20rem;
        overflow-y: scroll;
        border-radius: 0 0 3px 3px;
        position: absolute;
        z-index: 1000;

        ul {
            padding: 0;
            margin: 0;
        }

        .result {
            padding: 9px 8px;
            background: $color-white;
            width: 100%;
            border-color: $color-white-5;
            border-style: solid;
            border-width: 0 1px 1px 1px;
            border-radius: 0;
            color: $color-tertiary;
            font-family: sans-serif;
            font-size: 14px;
            display: block;
            cursor: pointer;
            text-align: left;

            &:hover, &--selected {
                background: $color-white-2;
            }

            &:last-child {
                border-radius: 0 0 3px 3px;
            }

        }

    }

}
</style>
