<template>
<div class="panel panel__search" id="panel-search">
  <app-search-documents :types="types" :faculties="faculties" :visibilities="visibilities" :sections="sections" :schoolClasses="schoolClasses" @searchDocuments="documents = $event"></app-search-documents>
  <app-document :document="document" v-for="document in documents" :key="document._id" @editDocument="showPopUp($event, 'appEditDocument')"></app-document>
  <app-search-collections :collectionsPermissions="collectionsPermissions" @searchCollections="collections  = $event"></app-search-collections>
  <app-collection :collection="collection" v-for="collection in collections" :key="collection._id"  @editCollection="showPopUp($event, 'appEditCollection')"></app-collection>

  <transition name="fade">

    <app-popup @closePopUp="popup = false" v-if="popup" :width="'80%'">
      <component v-if="popup ":is="popup" :id="entityToEdit" :types="types" :faculties="faculties" :visibilities="visibilities" :sections="sections" :schoolClasses="schoolClasses" :collectionsPermissions="collectionsPermissions">
      </component>
    </app-popup>
  </transition>

</div>
</template>

<script>

import searchDocuments from "./searchDocuments";
import searchCollections from "./searchCollections";
import Document from "@/components/document/document";
import Collection from "@/components/collection/collection";
import PopUp from "@/components/popup/popup";
import EditDocument from "@/components/editDocument/editDocument";
import EditCollection from "@/components/editCollection/editCollection";

import axios from "axios";

export default {
  props: ["types", "faculties", "visibilities", "sections", "schoolClasses", "collectionsPermissions"],
  data: () => {
    return {
      documents: undefined,
      collections: undefined,
      popup: false
    };
  },
  components: {
    appSearchDocuments: searchDocuments,
    appSearchCollections: searchCollections,
    appDocument: Document,
    appCollection: Collection,
    appPopup: PopUp,
    appEditDocument: EditDocument,
    appEditCollection: EditCollection
  },
  methods: {
    showPopUp(id, component) {
      this.popup = component;
      this.entityToEdit = id;
    }
  }
}
</script>

<style lang="scss">
</style>
