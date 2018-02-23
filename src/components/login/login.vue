<template>
<div id="app">
  <div class="login-box module">
    <div class="row">
      <div class="col-1-of-1">
        <img src="static/logo/itisFermi.svg" class="logo">
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-1">
        <input type="email" class="module-input-text" placeholder="Email" autocomplete="off" v-model="loginEmail" @keyup.enter="login">
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-1">
        <input type="password" class="module-input-text" placeholder="Password" autocomplete="off" v-model="loginPassword" @keyup.enter="login">
      </div>
    </div>
    <div class="row">
      <div class="col-1-of-1">
        <button class="module-button module-button--green" @click="login">Entra</button>
      </div>
    </div>
    <div class="row" v-if="response">
      <div class="col-1-of-1">
        <p class="error">{{responseMessage}}</p>
      </div>
    </div>
  </div>
  <footer class="footer">
    <ul>
      <li><a href="http://wwww.itisfermi.it" target="_blank">Itis Enrico Fermi</a></li>
      <li><a href="/login">Login</a></li>
      <li><a href="/signup">Registrati</a></li>
      <li><a href="/help">Serve aiuto?</a></li>
      <li><a href="https://www.riccardosangiorgio.com">Riccardo Sangiorgio</a></li>
    </ul>
  </footer>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "login",
  data: () => {
    return {
      response: false,
      responseMessage: "",
      loginEmail: "",
      loginPassword: ""
    };
  },
  methods: {
    login() {

      let user = {
        email: this.loginEmail,
        password: this.loginPassword
      };

      axios.post("/login", user)
        .then((token) => {
          localStorage.setItem('token', token);
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

<style lang="scss">
@import "./src/scss/mainLogin.scss";
</style>
