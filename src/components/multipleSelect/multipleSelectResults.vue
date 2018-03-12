<template>
<div class="module-multiple-select-tag-box">
  <ul>
    <li v-bind:value="output._id" v-for="output in multipleSelectOutput" v-on:click="remove">
      <span v-bind:value="output._id" v-for="element in dbElements">
        {{ output[element] }}
      </span>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: "multipleSelectResults",
  props: {
    multipleSelectOutput: {
      type: Array,
      default: () => {
        return [];
      }
    },
    dbElements: Array
  },
  methods: {
    remove: function(event) {
      var id = event.target.getAttribute("value");

      var element = (this.multipleSelectOutput.filter(function(object) {
        return object._id == id;
      }))[0];

      var index = this.multipleSelectOutput.indexOf(element);

      this.multipleSelectOutput.splice(index, 1);
      this.$emit("elementRemoved", this.multipleSelectOutput);
    }
  }
}
</script>

<style scoped lang="scss">
.module-multiple-select-tag-box {
    ul {
        padding: 0;
        li {
            margin: 1rem 0;
            display: inline-block;
            background-color: #DBDBDB;
            border-radius: 20px;
            padding: 7px;
            font-size: 12px;
            font-family: sans-serif;
            cursor: pointer;

            &:not(:first-child) {
                margin-left: 5px;
            }
        }
    }
}
</style>
