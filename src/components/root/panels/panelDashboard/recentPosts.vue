<template>
<div class="panel__dashboard--recent-posts">
  <div class="module document-box" v-if="response">
    <p>{{ responseMessage }}</p>
  </div>
  <div class="module document-box" v-for="document in recentDocuments" v-else>
    <div class="document-box-content">
      <div class="document-box-content__header">
        <div class="document-box-content__header--img">
          <img v-bind:src="'pics/' + document.author.img" alt="Foto profilo utente">
        </div>
        <p class="document-box-content__header--heading heading-fourth">
          <span>{{document.author.firstname}} {{document.author.lastname}}</span> ha pubblicato
          <span>{{document.name}}</span>.
        </p>
        <a v-bind:href="'documents/' + document.directory" class="document-box-content__header--download" download>
              <i class="fas fa-download"></i>
          </a>
      </div>
      <div class="document-box-content__info">
        <p class="document-box-content__info--description">{{document.description}}</p>
      </div>
      <div class="document-box-content__footer">
        <ul class="document-box-content__footer--info">
          <li>{{document.subject.subject}}</li>
          <li>{{document.class.class}} {{document.section.section}}</li>
          <li>{{document.type.type}}</li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script>

import axios from "axios";

export default {

  data: () => {
    return {
      recentDocuments: [],
      response: false,
      responseMessage: ""
    };
  },
  created() {
    this.getRecentDocuments();
  },
  methods: {
    getRecentDocuments() {
      return axios.post("/dashboard/recentPosts")
        .then((response) => {

          let documents = response.data;

          for (let i = 0; i < documents.length; i++) {
            if (documents[i].class == null) {
              documents[i].class = {
                _id: "comune",
                  class: "Comune"
              }
            }

            if (documents[i].section == null) {
              documents[i].section = {
                _id: "comune",
                section: "Comune"
              }
            }
          }

          this.recentDocuments = documents;
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
