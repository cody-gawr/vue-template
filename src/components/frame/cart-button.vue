<template>
  <v-menu
    :close-on-content-click="false"
    offset-y
    origin="right top"
    left
    content-class="cart-dropdown"
    transition="slide-y-transition"
    nudge-top="-10"
    class="v-step-3"
    v-model="menu"
  >
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-badge color="red" :overlap="true" v-if="cartItems.length>0">
          <template v-slot:badge>
            <span>{{cartItems.length}}</span>
          </template>
          <v-icon>mdi-cart</v-icon>
        </v-badge>
        <v-icon v-else>mdi-cart</v-icon>
      </v-btn>
    </template>
    <div class="dropdown-content">
      <v-card>
        <div class="dropdown-top d-custom-flex justify-space-between primary">
          <span class="white--text fw-bold">{{$t("head.cart")}}</span>
        </div>
        <div class="text-xs-center pa-4" v-if="cartItems == ''">
          <span class="d-block font-3x mb-15 error--text">
            <i class="mdi mdi-shopping-cart"></i>
          </span>
          <h3>{{$t('head.cartNoItem')}}</h3>
        </div>
        <div v-else class="dropdown-content">
          <perfect-scrollbar style="height:280px" :settings="settings">
            <v-list two-line>
              <template v-for="(cart, index) in cartItems">
                <v-divider :key="`l-${index}`" v-if="index!==0"></v-divider>
                <v-list-item :key="index">
                  <v-list-item-avatar :tile="true">
                    <v-img :src="cart.picture"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content v-if="$store.state !== null && $store.state !== undefined">
                    <v-list-item-title>{{cart.dish}}</v-list-item-title>
                    <v-list-item-subtitle>{{cart.price}} {{$store.state.cart.currency}} X {{cart.amount}}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-btn :disabled="cart.loading===true" icon small @click="decrement(cart.id)">
                    <v-icon color="grey">mdi-minus</v-icon>
                  </v-btn>
                  <v-btn :disabled="cart.loading===true" icon small @click="increment(cart.id)">
                    <v-icon color="grey">mdi-plus</v-icon>
                  </v-btn>
                  <v-btn :disabled="cart.loading===true" icon small @click="remove(cart.id)">
                    <v-icon color="grey">mdi-trash-can-outline</v-icon>
                  </v-btn>
                </v-list-item>
              </template>
            </v-list>
          </perfect-scrollbar>
        </div>
        <v-card-actions
          v-if="$store.state !== null && $store.state !== undefined && cartItems != ''"
        >
          <v-btn
            color="primary"
            nuxt
            :to="{ name: 'cart', params: { lang: $router.currentRoute.params.lang}}"
            small
          >{{$t('head.viewCart')}}</v-btn>
          <v-spacer></v-spacer>
          <span
            v-if="$store.state !== null && $store.state !== undefined"
            class="fs-14 grey--text"
          >{{$t('head.totalPrice')}}: {{getTotalPrice}} {{$store.state.cart.currency}}</span>
        </v-card-actions>
      </v-card>
    </div>
  </v-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { RouteConfig, RouteRecord } from "vue-router";

@Component
export default class CartButton extends Vue {
  settings = {};
  menu: boolean = false;

  get cartItems(): any[] {
    let uid = this.$store.state.login.userId;
    let u = this.$store.state.cart.users.find(o => o.id === uid);
    if (u !== undefined) return u.cart;
    return [];
  }

  get getTotalPrice() {
    return this.cartItems.reduce((a, c) => (a += c.price * c.amount), 0);
  }

  increment(id: string) {
    this.$store.dispatch("cart/incrementDish", id);
  }

  decrement(id: string) {
    this.$store.dispatch("cart/decrementDish", id);
  }

  remove(id: string) {
    this.$store.dispatch("cart/removeDish", id);
  }
}
</script>

<style lang="scss">
.cart-dropdown {
  min-width: 320px !important;
  .dropdown-top {
    padding: 1rem 1.25rem;
    border-radius: 0 !important;
  }
  .dropdown-content {
    .v-list__tile {
      height: auto;
      padding: 0.625rem;
      .v-list__tile__action {
        opacity: 0;
        transition: opacity 0.3s linear;
        .v-btn {
          margin: 0;
        }
      }
      &:hover {
        .v-list__tile__action {
          opacity: 1;
        }
      }
    }
  }
}
</style>