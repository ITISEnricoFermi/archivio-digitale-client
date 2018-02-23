<template>
  <div class="module" v-if="collections">
    <div class="row" v-for="collection in collections">
      <div class="col-1-of-1">
        <article>
          <p>{{document.documentCollection}}</p>
          <p v-if="collection.own" @click="removeCollection(collection._id)">Elimina</p>
          <p>{{document.author.author}}</p>
        </article>
      </div>
    </div>
    <div class="row" v-if="collections.length === 0">
      <div class="col-1-of-1">
        <p class="module-document-search-noresults">Nessun risultato</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchCollectionsResults",
  props: ["collections"],
  data: () => {
    return {

    };
  },
  methods: {
    removeCollection() {

    }
  }
}
</script>

<style scoped lang="scss">
</style>
