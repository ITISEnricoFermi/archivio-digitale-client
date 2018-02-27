<template>
  <div class="module">
    <div class="row">
      <div class="col-1-of-1">
        <input type="text" class="module-input-text" placeholder="Titolo" autocomplete="off" required v-model="documentToUpload.name">
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-1">
        <textarea class="module-input-textarea" placeholder="Descrizione" v-model="documentToUpload.description"></textarea>
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-3">
        <select class="module-input-select" v-model="documentToUpload.type" required>
          <option class="module-input-option" value="" disabled selected>Tipo</option>
          <option class="module-input-option" v-bind:value="type._id" v-for="type in types">
            {{ type.type }}
          </option>
        </select>
      </div>
      <div class="col-1-of-3">
        <select class="module-input-select" v-model="documentToUpload.faculty">
          <option class="module-input-option" value="" disabled selected>Specializzazione</option>
          <option class="module-input-option" :value="faculty._id" v-for="faculty in faculties">
            {{ faculty.faculty }}
          </option>
        </select>
      </div>
      <div class="col-1-of-3">
        <select class="module-input-select" v-model="documentToUpload.subject" required>
          <option class="module-input-option" value="" disabled selected>Materia</option>
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
        <select class="module-input-select" v-model="documentToUpload.class">
          <option class="module-input-option" value="0" selected>Classe</option>
          <option class="module-input-option" :value="schoolClass._id" v-for="schoolClass in schoolClasses">
            {{ schoolClass.class }}
          </option>
        </select>
      </div>
      <div class="col-1-of-3">
        <select class="module-input-select" v-model="documentToUpload.section">
          <option class="module-input-option" value="" selected>Sezione</option>
          <option class="module-input-option" v-for="section in sections" :value="section._id">
            {{ section.section }}
          </option>
        </select>
      </div>
      <div class="col-1-of-3">
        <select class="module-input-select" v-model="documentToUpload.visibility">
          <option class="module-input-option" value="pubblico" disabled selected>Visibilità</option>
          <option class="module-input-option" v-for="visibility in visibilities" :value="visibility._id">{{visibility.visibility}}</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-2">
        <input type="file" class="module-input-file" id="upload-file" ref="uploadFile">
        <label class="module-button module-button--blue" for="upload-file">Carica file</label>
      </div>
      <div class="col-1-of-2">
        <button class="module-button module-button--green" @click="upload">Carica documento</button>
      </div>
    </div>
  </div>
</template>

<script>

import {eventBus} from "@/main";

import axios from "axios";

export default {
  name: "createDocument",
  props: ["types", "faculties", "visibilities", "sections", "schoolClasses"],
  data: () => {
    return {
      response: false,
      responseMessage: "",
      documentToUpload: {
        name: "",
        type: "",
        faculty: "",
        subject: "",
        class: "0",
        section: "",
        visibility: "pubblico",
        description: ""
      }
    };
  },
  methods: {
    upload() {

      let formData = new FormData();
      let config = {
        onUploadProgress: function(progressEvent) {
          let actualProgress = progressEvent.loaded;
          let totalProgress = progressEvent.total;
          let progress = Math.floor((actualProgress * 100) / totalProgress);

          eventBus.uploading(progress);

        }
      };

      let document = JSON.stringify(this.documentToUpload);
      let file = this.$refs.uploadFile.files[0];

      formData.append("document", document);
      formData.append("fileToUpload", file);

      axios.put("/documents/", formData, config)
        .then((response) => {
          this.response = true;
          this.responseMessage = response.data;

          this.documentToUpload.name = "";
          this.documentToUpload.type = "";
          this.documentToUpload.faculty = "";
          this.documentToUpload.subject = "";
          this.documentToUpload.class = "0";
          this.documentToUpload.section = "";
          this.documentToUpload.visibility = "pubblico";
          this.documentToUpload.description = "";

          this.$socket.emit("newDocument");

          this.$emit("documentMessage", "Documento caricato con successo.");

        })
        .catch((e) => {
          this.$emit("documentMessage", e.response.data);
        });
    }
  }
}
</script>

<style scoped lang="scss">
</style>
