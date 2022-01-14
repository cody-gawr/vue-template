<template>
  <v-navigation-drawer fixed app v-model="showMenu">
    <v-toolbar class="elevation-1">
      <v-app-bar-nav-icon>
        <v-avatar :tile="true" :size="36">
          <img src="@/assets/logo.png" />
        </v-avatar>
      </v-app-bar-nav-icon>
      <v-toolbar-title>Addubby</v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-list dense nav>
      <v-list-item v-for="item in _items" :key="item.title" link @click="item.action()">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{$t(item.text)}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { RouteConfig, RouteRecord } from "vue-router";

export interface MenuItem {
  icon: string;
  text: string;
  show: () => boolean;
  action: () => void;
}

@Component
export default class Navigation extends Vue {
  ip: string = "";
  get _items() {
    return this.items.filter(o => o.show());
  }
  items: MenuItem[] = [
    {
      icon: "mdi-home",
      text: "menu.home",
      show: () => true,
      action: () => this.navigate("home")
    },
    {
      icon: "mdi-account",
      text: "menu.account",
      show: () =>
        typeof this.$store.state.login.auth === "string" &&
        this.$store.state.login.auth !== "",
      action: () => this.navigate("editprofile")
    },
    {
      icon: "mdi-cart",
      text: "menu.cart",
      show: () =>
        typeof this.$store.state.login.auth === "string" &&
        this.$store.state.login.auth !== "" &&
        typeof this.$store.state.cart.restaurantId === "string" &&
        this.$store.state.cart.restaurantId !== "" &&
        typeof this.$store.state.cart.orderId === "string" &&
        this.$store.state.cart.orderId !== "",
      action: () => this.navigate("cart")
    },
    {
      icon: "mdi-food",
      text: "menu.menu",
      show: () =>
        typeof this.$store.state.login.auth === "string" &&
        this.$store.state.login.auth !== "" &&
        typeof this.$store.state.cart.restaurantId === "string" &&
        this.$store.state.cart.restaurantId !== "",
      action: () =>
        this.navigate("menu", { id: this.$store.state.cart.restaurantId })
    },
    {
      icon: "mdi-silverware",
      text: "menu.restaurant",
      show: () =>
        typeof this.$store.state.login.auth === "string" &&
        this.$store.state.login.auth !== "" &&
        typeof this.$store.state.cart.restaurantId === "string" &&
        this.$store.state.cart.restaurantId !== "",
      action: () =>
        this.navigate("restaurant", {
          id: this.$store.state.cart.restaurantId
        })
    },
    // {
    //   icon: "mdi-settings",
    //   text: "menu.settings",
    //   show: () =>
    //     typeof this.$store.state.login.auth === "string" &&
    //     this.$store.state.login.auth !== "" &&
    //     typeof this.$store.state.cart.restaurantId === "string" &&
    //     this.$store.state.cart.restaurantId !== "",
    //   action: () => this.navigate("settings")
    // },
    {
      icon: "mdi-eye-check",
      text: "menu.privacy",
      show: () => true,
      action: () => this.navigate("privacy")
    },
    {
      icon: "mdi-information",
      text: "menu.about",
      show: () => true,
      action: () => this.navigate("about")
    },
    {
      icon: "mdi-chat-alert",
      text: "menu.help",
      show: () =>
        typeof this.$store.state.login.auth === "string" &&
        this.$store.state.login.auth !== "",
      action: () => this.navigate("help")
    }
  ];
  drawer = null;

  navigate(routeName: string, params?: { [k: string]: string } | undefined) {
    var lang = this.$router.currentRoute.params.lang;
    this.$router.push({
      name: routeName,
      params: Object.assign({ lang: lang }, params || {})
    });
  }

  get showMenu() {
    return this.$store.state.graphic.menu;
  }

  set showMenu(val) {
    this.$store.commit("graphic/setMenu", val);
  }
}
</script>