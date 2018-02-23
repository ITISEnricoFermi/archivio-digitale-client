<template>
<div class="panel panel__settings">
  <div class="module">
    <div class="row">
      <div class="col-1-of-2">
        <input type="password" class="module-input-text" placeholder="Password attuale" autocomplete="off" v-model="passwords.old">
      </div>
      <div class="col-1-of-2">
        <input type="password" class="module-input-text" placeholder="Nuova password" autocomplete="off" v-model="passwords.new">
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-2">
        <input type="file" class="module-input-file" id="upload-img-profile" @change="uploadProfilePic" ref="settingsProfilePic">
        <label class="module-button module-button--blue" for="upload-img-profile">Carica foto profilo</label>
      </div>
      <div class="col-1-of-2">
        <button class="module-button module-button--green" @click="saveSettings">Salva impostazioni</button>
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-1">
        <button class="module-button module-button--red" @click="disableAccount">Elimina account</button>
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-1">
        <p class="module__info">
          <span>L'account verrà disattivato. Puoi riattivarlo in qualunque momento contattando l'amministratore.</span>
          <br/><span>Le tue pubblicazioni rimarranno sulla piattaforma.</span>
        </p>
      </div>
    </div>
  </div>
  <div class="module" v-if="response">
    <div class="row">
      <div class="col-1-of-1">
        <p>{{responseMessage}}</p>
      </div>
    </div>
  </div>
</div>

</template>

<script>

import axios from "axios";

export default {
  name: "panelSettings",
  data: () => {
    return {
      response: false,
      responseMessage: "",
      passwords: {
        new: "",
        old: ""
      },
      profilePic: ""
    };
  },
  methods: {
    saveSettings() {
      axios.post("/settings/updateInformations", this.passwords)
        .then(() => {
          window.location.replace("/login");
        })
        .catch((e) => {
          this.response = true;
          this.responseMessage = e.response.data;
        });
    },
  uploadProfilePic() {
    let profilePic = this.$refs.settingsProfilePic.files[0];

    let formData = new FormData();

    formData.append("picToUpload", profilePic);

    axios.post("/settings/updateProfilePic", formData)
      .then((message) => {
        this.response = true;
        this.responseMessage = message.data;
        window.location.reload();
      })
      .catch((e) => {
        this.response = true;
        this.responseMessage = e.response.data;
      });
  },
  disableAccount() {
    axios.post("/settings/disableAccount")
      .then(() => {
        window.location.replace("/");
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
