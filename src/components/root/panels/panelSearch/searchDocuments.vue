<template>
  <div class="module">
    <div class="row">
      <div class="col-1-of-1">
        <input type="text" class="module-input-text" placeholder="Cerca un documento" autocomplete="off" v-model="query.fulltext" @keyup.enter="search">
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-3">
        <select class="module-input-select" v-model="query.type">
            <option class="module-input-option" value="" selected>Tipo</option>
            <option class="module-input-option" v-bind:value="type._id" v-for="type in types">
              {{ type.type }}
            </option>
          </select>
      </div>
      <div class="col-1-of-3">
        <select class="module-input-select" v-model="query.faculty">
            <option class="module-input-option" value="" selected>Specializzazione</option>
            <option class="module-input-option" v-bind:value="faculty._id" v-for="faculty in faculties">
              {{ faculty.faculty }}
            </option>
          </select>
      </div>
      <div class="col-1-of-3">
        <select class="module-input-select" v-model="query.subject">
            <option class="module-input-option" value="" selected>Materia</option>
            <optgroup :label="faculty.faculty" v-for="faculty in faculties">
              <option class="module-input-option" :value="subject._id" v-for="subject in faculty.subjects">
                {{ subject.subject }}
              </option>
            </optgroup>
          </select>
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-3">
        <select class="module-input-select" v-model="query.class">
            <option class="module-input-option" value="" selected>Classe</option>
            <option class="module-input-option" v-bind:value="schoolClass._id" v-for="schoolClass in schoolClasses">
              {{ schoolClass.class }}
            </option>
          </select>
      </div>
      <div class="col-1-of-3">
        <select class="module-input-select" v-model="query.section">
            <option class="module-input-option" value="" selected>Sezione</option>
            <option class="module-input-option" v-bind:value="section._id" v-for="section in sections">
              {{ section.section }}
            </option>
          </select>
      </div>
      <div class="col-1-of-3">
        <select class="module-input-select" v-model="query.visibility">
            <option class="module-input-option" value="" selected>Visibilità</option>
            <option class="module-input-option" v-for="visibility in visibilities" v-bind:value="visibility._id">
              {{ visibility.visibility }}
            </option>
          </select>
      </div>
    </div>
    <div class="row">
      <div clas="col-1-of-1">
        <button class="module-button module-button--green" @click="search">Cerca</button>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "createDocument",
  props: ["types", "faculties", "visibilities", "sections", "schoolClasses"],
  data: () => {
    return {
      subjects: "",
      query: {
        fulltext: "",
        type: "",
        faculty: "",
        subject: "",
        class: "",
        section: "",
        visibility: ""
      }
    };
  },
  sockets: {
    documentDeleted() {
      this.search();
    }
  },
  methods: {
    search() {
      axios.post("/documents/search/", this.query)
        .then((response) => {
          let documents = response.data;

          for (let i = 0; i < documents.length; i++) {
            if (documents[i].author._id === response.headers["x-userid"] || response.headers["x-userprivileges"] === "admin") {
              documents[i].own = true;
            }
          }

          this.$emit("searchDocuments", documents);
        })
        .catch((e) => {
          console.log(e.response.data);
        });
    }
  }
}
</script>

<style scoped lang="scss">
</style>
