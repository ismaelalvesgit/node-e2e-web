<template>
  <div class="login-page">
    <app-navbar></app-navbar>
    <div class="wrapper wrapper-full-page">
      <div class="full-page login-page section-image">
        <!--   you can change the color of the filter page using: data-color="blue | azure | green | orange | red | purple" -->
        <div class="content">
          <div class="container">
            <div class="col-lg-4 col-md-6 ml-auto mr-auto">
              <card type="login">
                <img
                  slot="header"
                  src="/static/img/vue-logo.png"
                  class="mb-2"
                  alt="ZombiePlus"
                  width="100%"
                >
                <h3 slot="header" class="header text-center mb-2">Login</h3>

                <fg-input
                  id="emailId"
                  name="email"
                  v-model="form.username"
                  addon-left-icon="nc-icon nc-single-02"
                  placeholder="nome@gmail.com"
                ></fg-input>

                <fg-input
                  id="passId"
                  name="password"
                  v-model="form.password"
                  addon-left-icon="nc-icon nc-key-25"
                  placeholder="senha"
                  type="password"
                ></fg-input>

                <br>

                <div
                  v-bind:class="{'alert alert-dismissible fade show': alert, 'alert-info':  alert.info, 'alert-danger':  alert.danger} "
                  v-show="alert.text"
                >
                  <span>
                    <b>{{alert.text}}</b>
                  </span>
                </div>

                <p-button
                  v-on:click="login($event)"
                  slot="footer"
                  type="danger"
                  round
                  block
                  class="mb-3 login-button"
                >Entrar</p-button>
              </card>
            </div>
          </div>
        </div>
        <app-footer></app-footer>
        <div class="full-page-background" style="background-image: url(/static/img/bg.png)"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { Card, Checkbox, Button } from "src/components/UIComponents";
import AppNavbar from "./Layout/AppNavbar";
import AppFooter from "./Layout/AppFooter";
import $ from "jquery";
export default {
  components: {
    Card,
    AppNavbar,
    AppFooter,
    [Checkbox.name]: Checkbox,
    [Button.name]: Button
  },
  methods: {
    toggleNavbar() {
      document.body.classList.toggle("nav-open");
    },
    closeMenu() {
      document.body.classList.remove("nav-open");
      document.body.classList.remove("off-canvas-sidebar");
    },
    login: function(e) {
      e.preventDefault();

      if (this.form.username.length === 0) {
        this.alert.text = "Opps. Cadê o email?";
        this.alert.info = true;
        this.alert.danger = false;
        return false;
      }

      if (this.form.password.length === 0) {
        this.alert.text = "Opps. Cadê a senha?";
        this.alert.info = true;
        this.alert.danger = false;
        return false;
      }

      this.$auth.login({
        body: { email: this.form.username, password: this.form.password },
        success: function(response) {
          localStorage.setItem("user_id", response.data.userId);
          return response.data;
        },
        error: function(response) {
          if (response.status === 401) {
            this.alert.text = "Usuário e/ou senha inválidos";
            this.alert.info = false;
            this.alert.danger = true;
            return false;
          }
        },
        rememberMe: true,
        redirect: "/movie"
      });
    }
  },
  data() {
    return {
      data: "",
      form: {
        username: "",
        password: ""
      },
      alert: { info: false, danger: false, text: "" }
    };
  },
  beforeDestroy() {
    this.closeMenu();
  }
};
</script>
<style>
</style>
