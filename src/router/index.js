import Vue from 'vue';
import Router from 'vue-router';
import axios from "axios";

import Root from "@/components/root/root";
import Login from "@/components/login/login";
import SignUp from "@/components/signup/signup";

Vue.use(Router)


export default new Router({
  mode: 'history',
  routes: [{
    path: "/",
    name: "Root",
    component: Root,
    beforeEnter: (to, from, next) => {
      axios.post("/users/me/logged")
        .then((response) => next())
        .catch((e) => next({
          path: "/login"
        }));
    }
  }, {
    path: "/login",
    name: "Login",
    component: Login
  }, {
    path: "/signup",
    name: "SignUp",
    component: SignUp
  }]
});