<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-form>
            <v-card class="elevation-12">
              <v-toolbar flat>
                <v-toolbar-title>{{ $t('login.loginform') }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <LanguageProvider></LanguageProvider>
              </v-toolbar>
              <v-card-text>
                <v-text-field
                  prepend-icon="mdi-account"
                  name="login"
                  :label="$t('login.username')"
                  type="text"
                  v-model="loginForm.username"
                  :rules="loginRules.username"
                  required
                  v-on:keyup.enter="submit"
                ></v-text-field>
                <v-text-field
                  id="password"
                  prepend-icon="mdi-lock"
                  name="password"
                  :label="$t('login.password')"
                  :append-icon="e1 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="() => (e1 = !e1)"
                  :type="e1 ? 'password' : 'text'"
                  v-model="loginForm.password"
                  :rules="loginRules.password"
                  v-on:keyup.enter="submit"
                  required
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="submit" color="primary">{{ $t('login.login') }}</v-btn>
                <v-btn @click="clear">{{ $t('login.clear') }}</v-btn>
              </v-card-actions>
              <v-card-actions>
                <v-spacer></v-spacer>
                <nuxt-link
                  :to="{ name: 'register', params: { lang: $router.currentRoute.params.lang }}"
                >{{$t('login.register')}}</nuxt-link>
                <v-spacer></v-spacer>
                <nuxt-link
                  :to="{ name: 'forgot', params: { lang: $router.currentRoute.params.lang }}"
                >{{$t('login.forgot')}}</nuxt-link>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-flex>
        <v-snackbar v-model="snackbar" :multi-line="true" :timeout="5" :top="true">
          {{ message }}
          <v-btn color="pink" flat @click="snackbar = false">{{ $t('common.close') }}</v-btn>
        </v-snackbar>
      </v-layout>
    </v-container>
  </v-content>
</template>


<script lang="ts">
const Cookie = process.client ? require("js-cookie") : undefined;
import { isValidUsername } from "@/modules/validate";
import { Component, Vue, Watch } from "vue-property-decorator";
import { Route } from "vue-router";
import { login } from "@/apis/login";
import { setStaySingIn } from "@/modules/local-storage";
import LanguageProvider from "@/components/frame/language-provider.vue";

@Component({
  middleware: "notAuthenticated",
  components: {
    LanguageProvider
  },
  layout: "empty"
})
export default class Login extends Vue {
  valid = false;
  message = "";
  snackbar = false;
  e1 = true;
  loading = false;
  pwdType = "password";
  redirect: string | undefined = undefined;

  loginForm = {
    username: "",
    password: "",
    staylogged: false
  };

  get loginRules() {
    return {
      username: [(v: any) => !!v || this.$root.$i18n.t("login.nameReq")],
      password: [(v: any) => !!v || this.$root.$i18n.t("login.passReq")]
    };
  }

  clear() {
    this.loginForm.username = "";
    this.loginForm.password = "";
  }

  submit() {
    setStaySingIn(this.loginForm.staylogged);
    login(this.loginForm.username, this.loginForm.password)
      .then((o: any) => {
        if (o.status === 200) {
          this.$store.commit("login/setAuth", o.data);
          Cookie.set("auth", o.data, { expires: 1, path: "/" });
          var lang = this.$router.currentRoute.params.lang;
          
          this.$store.dispatch("cart/findOrder").then(o => {
            if (this.$router.currentRoute.query.redirect === "qr") {
              this.$router.push({
                name: "qr",
                params: {
                  id: this.$store.state.qr.restaurantId,
                  key: this.$store.state.qr.key,
                  tid: this.$store.state.qr.table
                }
              });
            } else {
              this.$router.replace({ name: "home", params: { lang: lang } });
            }
          });
        }
      })
      .catch((e: any) => {
        console.log(e.response.data);
        // this.$store.dispatch(StoreActions.StoreTopMessage, {
        //   visible: true,
        //   text: e.message,
        //   color: "error"
        // });
      });
  }
}
</script>