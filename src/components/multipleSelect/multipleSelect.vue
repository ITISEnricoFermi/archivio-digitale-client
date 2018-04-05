<template>
  <div class="multiple-select">
    <input type="text" class="module-input-text" :placeholder="placeholder" v-model="query" @keyup.enter="add" @keyup="search($event)" >
    <div class="multiple-select__results">
      <ul>
        <li :value="result._id" v-for="(result, index) in results" :key="index" @click="add">
          <span v-for="(element, index) in dbElements" :key="index">
              {{ result[element] }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

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
      results: []
    }
  },
  methods: {
    async search (event) {
      if (!this.query) {
        this.results = []
        return false
      }

      try {
        let response = await axios.post(this.url, {
          query: this.query
        })

        this.results = response.data.filter(e => this.selected.findIndex(b => b._id === e._id) === -1)
      } catch (e) {
        console.log(e)
      }
    },
    async add () {
      try {
        if (this.results.length) {
          this.selected.push(this.results[0])
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

    &__results {
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

        li {
            padding: 9px 8px;
            background: #FFFFFF;
            width: 100%;
            border-color: #DBDBDB;
            border-style: solid;
            border-width: 0 1px 1px 1px;
            border-radius: 0;
            color: #151A22;
            font-family: sans-serif;
            font-size: 14px;
            display: block;
            cursor: pointer;
            text-align: left;

            &:first-child {
                background: #F7F7F7;
            }

            &:last-child {
                border-radius: 0 0 3px 3px;
            }

        }

    }

}
</style>
