<template>
<div class="module-multiple-select">
  <input type="text" class="module-input-text" :placeholder="placeholder" v-model="multipleSelectField" v-on:keyup="typing">
  <div class="module-multiple-select__results">
    <ul>
      <li v-bind:value="result._id" v-for="result in multipleSelectResults" v-on:click="click">
        <span v-for="element in dbElements">
            {{ result[element] }}
          </span>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: "multipleSelect",
  props: {
    placeholder: String,
    multipleSelectData: Array,
    dbElements: Array,
    multipleSelectOutput: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data: () => {
    return {
      multipleSelectField: "",
      multipleSelectResults: []
    };
  },
  methods: {

    typing(event) {

      if (event.key == "Enter") {
        if (this.multipleSelectResults.length !== 0) {
          this.multipleSelectOutput.push(this.multipleSelectResults[0]);
          this.multipleSelectField = "";

          // EMIT
          this.$emit("elementAdded", this.multipleSelectOutput);

          return this.multipleSelectResults = [];
        }
      }

      this.multipleSelectResults = [];
      if (this.multipleSelectField) {

        this.multipleSelectData.forEach((element) => {
          // if (this.multipleSelectOutput.indexOf(element) != -1) {
          //   return true;
          // }

          if ((this.multipleSelectOutput.filter(el => el._id == element._id))[0]) {
            return true;
          }

          for (var i = 0; i < this.dbElements.length; i++) {
            if ((new RegExp(this.multipleSelectField.toLowerCase())).test(element[this.dbElements[i]].toLowerCase())) {
              this.multipleSelectResults.push(element);
              i = this.dbElements.length;
            }
          }

        });
      }
    },

    click(event) {
      var id = event.target.getAttribute("value");
      var element = (this.multipleSelectResults.filter(function(object) {
        return object._id == id;
      }))[0];

      this.multipleSelectOutput.push(element);
      this.multipleSelectField = "";

      // EMIT
      this.$emit("elementAdded", this.multipleSelectOutput);

      return this.multipleSelectResults = [];
    }
  }
}
</script>

<style scoped lang="scss">
.module-multiple-select {
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
