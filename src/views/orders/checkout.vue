<template>
  <v-container fluid fill-height>
    <v-layout>
      <v-flex md12>
        <v-card class="mx-auto">
          <v-card-title>{{$t("checkout.title")}}</v-card-title>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="6" lg="6">
                <v-card class="elevation-0">
                  <v-card-title>{{$t("checkout.dishList")}}</v-card-title>
                  <perfect-scrollbar style="max-height:280px" :settings="settings">
                    <v-list two-line>
                      <template v-for="(cart, index) in cartItems">
                        <!-- <v-divider :key="index" v-if="index!==0">
                          
                        </v-divider>-->
                        <!-- this is jin tai comment -->
                        <v-list-item :key="index">
                          <v-list-item-avatar :tile="true">
                            <v-img :src="cart.picture"></v-img>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>{{cart.dish}}</v-list-item-title>
                            <v-list-item-subtitle>{{cart.price}} {{$store.state.cart.currency}} X {{cart.amount}}</v-list-item-subtitle>
                          </v-list-item-content>
                          <span>{{cart.price*cart.amount}} {{$store.state.cart.currency}}</span>
                        </v-list-item>
                      </template>
                    </v-list>
                  </perfect-scrollbar>
                  <v-card-actions>
                    <span
                      class="fs-14 grey--text"
                    >{{$t('head.totalPrice')}}: {{getTotalPrice}} {{$store.state.cart.currency}}</span>
                  </v-card-actions>
                </v-card>
              </v-col>
              <v-col cols="12" sm="12" md="6" lg="6">
                <v-card class="elevation-0">
                  <v-card-title>{{$t("checkout.payments")}}</v-card-title>
                  <v-container>
                    <!-- <v-row>
                      <v-col cols="12">
                        <v-radio-group v-model="payment" :mandatory="false" :row="true">
                          <v-radio color="primary" :value="0" label="Credit card"></v-radio>
                          <v-radio color="primary" :value="1" label="Cash"></v-radio>
                          <v-radio color="primary" :value="2" label="Stripe"></v-radio>
                        </v-radio-group>
                      </v-col>
                    </v-row> -->
                    <v-row>
                      <!-- <v-col cols="12">
                        <div id="card-element"></div>
                      </v-col> -->
                      <v-col cols="12">
                        <v-btn width="100%" class="check-btn" @click="gotoPayment(0)">
                          <v-icon left>mdi-credit-card-multiple</v-icon>Pay Cash
                        </v-btn>
                        <v-btn width="100%" @click="gotoPayment(1)" class="check-btn">
                          <v-icon left>mdi-cash</v-icon>Pay Creadit Card
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { purchaseFoods } from "@/apis/datastore/checkout";
import { error } from "util";
import { sentToKitchen } from "@/apis/orders/order";

let elements;
let card;

let totalPrice = 0;

@Component
export default class Checkout extends Vue {
  payment: number = 0;
  settings = {};
  cartHead = [
    { text: "", align: "left", sortable: false, value: "picture" },
    {
      text: this.$root.$i18n.t("head.cartDish"),
      value: "dish",
      sortable: false
    },
    {
      text: this.$root.$i18n.t("head.cartamount"),
      value: "amount",
      sortable: false
    },
    {
      text: this.$root.$i18n.t("head.cartPrice"),
      value: "price",
      sortable: false
    },
    {
      text: this.$root.$i18n.t("head.cartTotal"),
      value: "total",
      sortable: false
    }
  ];

  get getTotalPrice() {
    totalPrice = this.cartItems.reduce((a, c) => (a += c.price * c.amount), 0);
    return this.cartItems.reduce((a, c) => (a += c.price * c.amount), 0);
  }

  get cartItems(): any[] {
    let uid = this.$store.state.login.userId;
    let c = this.$store.state.cart.users
      .reduce(
        (a, b) =>
          a.concat(
            b.cart.map(o => {
              var _ = {};
              Object.assign(_, o, { userId: b.id });
              return _;
            })
          ),
        []
      )
      .filter(o => o.status < 1);
    return c;
  }

  gotoPayment (value : number) {
    window.localStorage.setItem('totalPrice' , totalPrice.toString())
    if (value === 0) { //cash
       this.$router.push({ name: "payment-cash", params: { lang: this.$router.currentRoute.params.lang, price : totalPrice.toString()}});
    } else if (value === 1) { //credit card
      this.$router.push({ name: "payment", params: { lang: this.$router.currentRoute.params.lang , price : totalPrice.toString()}});
    }
  }

  increment(id: string) {
    this.$store.commit("cart/increment", id);
  }

  decrement(id: string) {
    this.$store.commit("cart/decrement", id);
  }

  remove(id: string) {
    this.$store.commit("cart/remove", id);
  }

  navCheckout() {
    console.log('0k')
    var lang = this.$router.currentRoute.params.lang;
    this.$router.push({ name: "checkout", params: { lang: lang } });
  }
}
</script>

<style>
input.amount {
  width: 50px;
  text-align: center;
}
input.amount:focus {
  outline: none;
}
.check-btn {
  margin-top: 10px;
}
</style>