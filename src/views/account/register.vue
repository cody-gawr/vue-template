<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-form v-model="valid" ref="form">
          <v-card class="elevation-12">
            <v-toolbar flat>
              <v-toolbar-title>{{ $t('register.registerForm') }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <LanguageProvider></LanguageProvider>
            </v-toolbar>
            <v-card-text>
              <v-text-field
                prepend-icon="mdi-account"
                name="login"
                :label="$t('register.username')"
                type="text"
                v-model="registerForm.username"
                :rules="loginRules.username"
                required
                v-on:keyup.enter="submit"
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi-email"
                name="login"
                :label="$t('register.email')"
                type="text"
                v-model="registerForm.email"
                :rules="loginRules.username"
                required
                v-on:keyup.enter="submit"
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi-lock"
                name="login"
                :label="$t('register.password')"
                :append-icon="e1 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="() => (e1 = !e1)"
                :type="e1 ? 'password' : 'text'"
                v-model="registerForm.password"
                :rules="loginRules.password"
                required
                v-on:keyup.enter="submit"
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi-lock"
                name="password"
                :label="$t('register.repeatPassword')"
                :append-icon="e2 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="() => (e2 = !e2)"
                :type="e2 ? 'password' : 'text'"
                v-model="registerForm.repeatPassword"
                :rules="loginRules.password"
                v-on:keyup.enter="submit"
                required
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="submit()" color="primary">{{ $t('register.register') }}</v-btn>
              <v-btn @click="clear">{{ $t('login.clear') }}</v-btn>
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
</template>


<script lang="ts">
const Cookie = process.client ? require("js-cookie") : undefined;
import { isValidUsername } from "@/modules/validate";
import { Component, Vue, Watch } from "vue-property-decorator";
import { Route } from "vue-router";
import { register } from "@/apis/login";
import { setStaySingIn } from "@/modules/local-storage";
import LanguageProvider from "@/components/frame/language-provider.vue";

@Component({
  middleware: "notAuthenticated",
  components: {
    LanguageProvider
  },
  layout: "empty"
})
export default class Register extends Vue {
  valid = false;
  message = "";
  snackbar = false;
  e1 = true;
  e2 = true;
  loading = false;
  pwdType = "password";
  redirect: string | undefined = undefined;

  registerForm = {
    username: "",
    email: "",
    password: "",
    repeatPassword: ""
  };

  public get loginRules() {
    return {
      username: [(v: any) => !!v || this.$root.$i18n.t("register.nameReq")],
      password: [(v: any) => !!v || this.$root.$i18n.t("register.passReq")]
    };
  }

  public clear() {
    this.registerForm.username = "";
    this.registerForm.password = "";
  }

  public submit() {
    console.log(this.registerForm);
    if (this.registerForm.password === this.registerForm.repeatPassword) {
      register(
        this.registerForm.email,
        this.registerForm.password,
        this.registerForm.username
      )
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
}
</script>