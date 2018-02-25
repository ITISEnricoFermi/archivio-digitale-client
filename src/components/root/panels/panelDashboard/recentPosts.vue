<template>
<div class="panel__dashboard--recent-posts">
  <div class="module document-box" v-if="response">
    <p>{{ responseMessage }}</p>
  </div>
  <app-post :document="document" v-for="(document, key) in recentDocuments" :key="document._id" @editDocument="editDocument($event)"></app-post>
</div>
</template>

<script>
import {
  eventBus
} from "@/main";

import Post from "@/components/post/post";

import axios from "axios";

export default {
  name: "recentPosts",
  data: () => {
    return {
      recentDocuments: [],
      response: false,
      responseMessage: ""
    };
  },
  created() {
    this.getRecentDocuments();

    eventBus.$on("documentDeleted", () => {
      this.getRecentDocuments();
    });
  },
  methods: {
    getRecentDocuments() {
      return axios.post("/dashboard/recentPosts")
        .then((response) => {
          this.recentDocuments = response.data;

          for (let i = 0; i < this.recentDocuments.length; i++) {
            if (this.recentDocuments[i].author._id === response.headers["x-userid"] || response.headers["x-userprivileges"] === "admin") {
              this.recentDocuments[i].own = true;
            }
          }

        })
        .catch((e) => {
          this.response = true;
          this.responseMessage = e.response.data;
        });
    },
    editDocument(id) {
      this.$emit("editDocument", id);
    }
  },
  components: {
    appPost: Post
  }
}
</script>

<style scoped lang="scss">

</style>
