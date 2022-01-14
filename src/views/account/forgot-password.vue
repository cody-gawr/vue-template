<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-form v-model="valid" ref="form">
          <v-card class="elevation-12">
            <v-toolbar flat>
              <v-toolbar-title>{{ $t('forgot.resetForm') }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <LanguageProvider></LanguageProvider>
            </v-toolbar>
            <v-card-text>
              <v-text-field
                prepend-icon="mdi-account"
                name="login"
                :label="$t('forgot.username')"
                type="text"
                v-model="resetForm.email"
                :rules="loginRules.username"
                required
                v-on:keyup.enter="submit"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="submit" color="primary">{{ $t('common.send') }}</v-btn>
              <v-btn @click="clear">{{ $t('common.clear') }}</v-btn>
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
import { isValidUsername } from "@/modules/validate";
import { Component, Vue, Watch } from "vue-property-decorator";
import { Route } from "vue-router";
import { forgot } from "@/apis/login";
import { setStaySingIn } from "@/modules/local-storage";
import LanguageProvider from "@/components/frame/language-provider.vue";

@Component({
  middleware: "notAuthenticated",
  components: {
    LanguageProvider
  },
  layout: "empty"
})
export default class Forgot extends Vue {
  valid = false;
  message = "";
  snackbar = false;
  e1 = true;
  loading = false;
  pwdType = "password";
  redirect: string | undefined = undefined;

  resetForm = {
    email: ""
  };

  get loginRules() {
    return {
      email: [(v: any) => !!v || this.$root.$i18n.t("forgot.nameReq")]
    };
  }

  clear() {
    this.resetForm.email = "";
  }

  submit() {
    if ((<any>this.$refs.form).validate()) {
      forgot(this.resetForm.email)
        .then((o: any) => {
          //this.loading = false;
          this.$router.push("/");
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