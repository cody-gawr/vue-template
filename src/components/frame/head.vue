<template>
  <v-app-bar app fixed clipped-right color="blue-gry" class="elevation-1">
    <v-app-bar-nav-icon @click.stop="toggleMenu"></v-app-bar-nav-icon>
    <!-- <v-text-field hide-details single-line label="Search" class="search-box">
      <template v-slot:append>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
    </v-text-field>-->
    <v-spacer></v-spacer>
    <LanguageProvider></LanguageProvider>
    <v-menu bottom left v-if="$store.state.login.auth">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" @click="click(item)">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn
      v-if="!$store.state.login.auth"
      icon
      nuxt
      :to="{ name: 'login', params: { lang: $router.currentRoute.params.lang}}"
    >
      <v-icon>mdi-login</v-icon>
    </v-btn>
    <Cart v-if="$store.state.login.auth"></Cart>
  </v-app-bar>
</template>
    
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import LanguageProvider from "@/components/frame/language-provider.vue";
import Cart from "@/components/frame/cart-button.vue";
const Cookie = process.client ? require("js-cookie") : undefined;

@Component({
  components: {
    LanguageProvider,
    Cart
  }
})
export default class Head extends Vue {
  drawer = null;

  toggleMenu() {
    this.$store.commit("graphic/setMenu");
  }

  get items() {
    return [
      {
        action: 0,
        title: this.$root.$i18n.t("head.logout")
      },
      {
        action: 1,
        title: this.$root.$i18n.t("head.editProfile")
      }
    ];
  }

  click(item: any) {
    if (item.action === 0) {
      Cookie.remove("auth", { path: "/" });
      this.$store.commit("login/setAuth", null);
      var lang = this.$router.currentRoute.params.lang;
      this.$router.push({ name: "home", params: { lang: lang } });
    }
    if (item.action === 1) {
      var lang = this.$router.currentRoute.params.lang;
      this.$router.push({ name: "editprofile", params: { lang: lang } });
    }
  }
}
</script>

<style lang="scss" >
.search-box .v-input__slot::before {
  border-style: none !important;
}
</style>