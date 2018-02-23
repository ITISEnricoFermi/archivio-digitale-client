<template>
<div class="panel panel__profile" id="panel-profile">
  <div class="profile">
    <div class="profile-cover">
      <div class="profile-cover__content">
        <div class="profile-cover__pic" v-bind:style="'background-image: url(pics/' + user.img + ');'"></div>
        <div class="profile-cover__info">
          <p class="profile-cover__info--name heading-primary">{{user.firstname}} {{user.lastname}}</p>
        </div>
      </div>
    </div>
    <div class="profile-menu">
      <ul class="profile-menu__ul">
        <li class="profile-menu__li" @click="showTab('pubblico')">
          <span class="profile-menu__li--value heading-tertiary">4</span>
          <span class="profile-menu__li--tag heading-fifth">Documenti pubblici</span>
        </li>
        <li class="profile-menu__li" @click="showTab('areariservata')">
          <span class="profile-menu__li--value heading-tertiary">4</span>
          <span class="profile-menu__li--tag heading-fifth">Documenti in area riservata</span>
        </li>
        <li class="profile-menu__li" @click="showTab('materia')">
          <span class="profile-menu__li--value heading-tertiary">4</span>
          <span class="profile-menu__li--tag heading-fifth">Documenti per materia</span>
        </li>
      </ul>
    </div>
    <div class="profile-documents">
      <div class="module" v-for="document in documents">
        <p>{{document.name}}</p>
      </div>
    </div>
  </div>
</div>
</template>

<script>

import axios from "axios";

export default {
  name: "panelProfile",
  props: ["user"],
  data: () => {
    return {
      tab: "pubblico",
      response: false,
      responseMessage: "",
      documents: []
    };
  },
  created: function() {
    this.getDocuments();
  },
  methods: {
    showTab: function(privileges) {
      this.tab = privileges;
      this.getDocuments();
    },
    getDocuments: function() {
      axios.post("/user/me/documents", {
          visibility: this.tab
        })
        .then((documents) => {
          this.documents = documents.data;
        })
        .catch((e) => {
          this.response = true;
          this.responseMessage = e.response.data;
        });
    }
  }
}
</script>

<style scoped lang="scss">
</style>
