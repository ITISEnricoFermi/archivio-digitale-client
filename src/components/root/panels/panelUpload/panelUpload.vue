<template>
<div class="panel panel__upload" id="panel-upload">
  <app-create-document :types="types" :faculties="faculties" :visibilities="visibilities" :sections="sections" :schoolClasses="schoolClasses" @documentMessage="documentResponse = $event"></app-create-document>
  <div class="module" v-if="documentResponse">
    <div class="row" v-if="progress">
      <div class="col-1-of-1">
        <app-progress :value="progress" :isStripped="true" :isAnimated="true"></app-progress>
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
import createDocument from "./createDocument";
import createCollection from "./createCollection";
import Progress from "@/components/progress/progress";


import axios from "axios";

import {
  eventBus
} from "@/main";

export default {
  props: ["types", "faculties", "visibilities", "sections", "schoolClasses", "collectionsPermissions"],
  data: () => {
    return {
      response: false,
      responseMessage: "",
      documentResponse: "",
      collectionResponse: "",
      progress: ""
    };
  },
  created() {
    eventBus.$on("uploading", (progress) => {
      this.progress = progress;

      if (this.progress === 100) {
        this.progress = 0;
      }

    });
  },
  methods: {

  },
  components: {
    appCreateDocument: createDocument,
    appCreateCollection: createCollection,
    appProgress: Progress
  }
}
</script>

<style lang="scss">
</style>
