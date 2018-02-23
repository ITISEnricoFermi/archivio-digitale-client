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
  props: ["placeholder", "multipleSelectData", "dbElements"],
  data: () => {
    return {
      multipleSelectField: "",
      multipleSelectResults: [],
      multipleSelectOutput: []
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
          if (this.multipleSelectOutput.indexOf(element) != -1) {
            return true;
          }

          for(var i = 0; i < this.dbElements.length; i++) {
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
</style>
