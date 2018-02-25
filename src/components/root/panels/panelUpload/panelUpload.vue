<template>
  <div class="panel panel__upload" id="panel-upload">
    <app-create-document :types="types" :faculties="faculties" :visibilities="visibilities" :sections="sections" :schoolClasses="schoolClasses" @documentMessage="documentResponse = $event"></app-create-document>
    <div class="module" v-if="documentResponse">
      <div class="row" v-if="uploading">
        <div class="col-1-of-1">
          <p>{{progress}}</p>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-1-of-1">
          <p>{{documentResponse}}</p>
        </div>
      </div>
    </div>
    <app-create-collection :collectionsPermissions="collectionsPermissions" @collectionMessage="collectionResponse = $event"></app-create-collection>
    <div class="module" v-if="collectionResponse">
      <div class="row">
        <div class="col-1-of-1">
          <p>{{collectionResponse}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";

import createDocument from "./createDocument";
import createCollection from "./createCollection";

export default {
  props: ["types", "faculties", "visibilities", "sections", "schoolClasses", "collectionsPermissions"],
  data: () => {
    return {
      response: false,
      responseMessage: "",
      documentResponse: "",
      collectionResponse: "",
      uploading: false,
      progress: ""
    };
  },
  methods: {

  },
  components: {
    appCreateDocument: createDocument,
    appCreateCollection: createCollection
  }
}
</script>

<style lang="scss">
</style>
