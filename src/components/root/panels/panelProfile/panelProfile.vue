<template>
<main class="panel panel__profile">
  <div class="profile">
    <div class="profile-cover">
      <div class="profile-img">
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
            <div>
              <span class="profile-menu__li--value heading-tertiary">{{ count.pubblico }}</span>
              <span class="profile-menu__li--tag heading-fifth">Documenti pubblici</span>
            </div>
          </li>
          <li class="profile-menu__li" @click="showTab('areariservata')">
            <div>
              <span class="profile-menu__li--value heading-tertiary">{{ count.areariservata }}</span>
              <span class="profile-menu__li--tag heading-fifth">Documenti in area riservata</span>
            </div>
          </li>
          <li class="profile-menu__li" @click="showTab('materia')">
            <div>
              <span class="profile-menu__li--value heading-tertiary">{{count.materia }}</span>
              <span class="profile-menu__li--tag heading-fifth">Documenti per materia</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="profile-documents">
      <div class="module" v-if="documents.length == 0">
        <div class="row">
          <div class="col-1-of-1">
            <p>Nessun documento nella scheda selezioanata.</p>
          </div>
        </div>
      </div>
      <app-document :document="document" v-for="document in documents" :key="document._id" v-else></app-document>
    </div>
  </div>
</main>
</template>

<script>
import Document from "@/components/document/document";

import axios from "axios";

export default {
  name: "panelProfile",
  props: ["user"],
  data: () => {
    return {
      tab: "pubblico",
      response: false,
      responseMessage: "",
      documents: [],
      count: {
        pubblico: "",
        areariservata: "",
        materia: ""
      }
    };
  },
  sockets: {
    newDocument() {
      this.getDocuments(this.tab);
    }
  },
  created() {
    this.getDocuments("pubblico");

    axios.get("/users/me/documents/count/pubblico")
      .then((response) => {
        this.count.pubblico = response.data;
      })
      .catch((e) => {
        this.response = true;
        this.responseMessage = "";
      });

    axios.get("/users/me/documents/count/areariservata")
      .then((response) => {
        this.count.areariservata = response.data;
      })
      .catch((e) => {
        this.response = true;
        this.responseMessage = "";
      });

    axios.get("/users/me/documents/count/materia")
      .then((response) => {
        this.count.materia = response.data;
      })
      .catch((e) => {
        this.response = true;
        this.responseMessage = "";
      });
  },
  methods: {
    showTab(privileges) {
      this.tab = privileges;
      this.getDocuments(privileges);
    },
    getDocuments(tab) {
      axios.get("/users/me/documents/" + tab)
        .then((response) => {
          this.documents = response.data;

          for (let i = 0; i < this.documents.length; i++) {
            if (this.documents[i].author._id === response.headers["x-userid"] || response.headers["x-userprivileges"] === "admin") {
              this.documents[i].own = true;
            }
          }

        })
        .catch((e) => {
          this.response = true;
          this.responseMessage = e.response.data;
        });
    }
  },
  components: {
    appDocument: Document
  }
}
</script>

<style scoped lang="scss">
</style>
