<template>
<div class="panel panel__search" id="panel-search">
  <app-search-documents :types="types" :faculties="faculties" :visibilities="visibilities" :sections="sections" :schoolClasses="schoolClasses" @searchDocuments="documents = $event"></app-search-documents>
  <app-search-documents-results :documents="documents"></app-search-documents-results>
  <app-search-collections :collectionsPermissions="collectionsPermissions" @searchCollections="collections  = $event"></app-search-collections>
  <app-search-collections-results :collections="collections"></app-search-collections-results>
</div>
</template>

<script>
import axios from "axios";

import searchDocuments from "./searchDocuments";
import searchCollections from "./searchCollections";
import searchDocumentsResults from "./searchDocumentsResults";
import searchCollectionsResults from "./searchCollectionsResults";

export default {
  props: ["types", "faculties", "visibilities", "sections", "schoolClasses", "collectionsPermissions"],
  data: () => {
    return {
      documents: undefined,
      collections: undefined
    };
  },
  methods: {

    removeDocument(id) {
      if (!confirm("Eliminare il documento?")) {
        return false;
      }
      axios.post("/search/removeDocumentById", {
          _id: id
        })
        .then((result) => {

          let element = (this.documents.filter(function(object) {
            return object._id == id;
          }))[0];

          let index = this.documents.indexOf(element);
          this.documents.splice(index, 1);

          console.log(result.data);

        })
        .catch((e) => {
          console.log(e.response.data);
        });
    },


  },
  components: {
    appSearchDocuments: searchDocuments,
    appSearchCollections: searchCollections,
    appSearchDocumentsResults: searchDocumentsResults,
    appSearchCollectionsResults: searchCollectionsResults
  }
}
</script>

<style lang="scss">

</style>
