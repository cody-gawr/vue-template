<template>
  <v-container fluid fill-height>
    <v-layout>
      <v-flex md12>
        <v-card class="mx-auto">
          <v-card-title>{{$t("head.cart")}}</v-card-title>
          <perfect-scrollbar style="max-height:800px" :settings="settings">
            <v-list two-line>
              <div class="cartMobile">
                <template v-for="(item, index) in cartItems">
                  <!-- About Mobile Version -->
                  <div class="cartListWrapper" :key="index" v-bind:class="{}">
                    <div class="itemImageWrapper">
                      <v-img :src="item.picture" class="imgItem"></v-img>
                    </div>
                    <div class="itemCartWrapper">
                      <div class="aboutMe" v-if="item.isUser===true">
                        {{item.name}}
                        <span v-if="item.id===$store.state.login.userId">(You)</span>
                      </div>
                      <div class="itemInfo" v-if="item.isUser===false">{{item.dish}}</div>
                      <div class="itemCart" v-if="item.isUser===false">
                        <div class="itemCountChange">
                          <v-btn icon small @click="decrement(item.id)" class="cartIcon">
                            <v-icon color="grey">mdi-minus</v-icon>
                          </v-btn>
                          <input
                            type="number"
                            class="amount"
                            readonly
                            min="1"
                            :value="item.amount"
                            width="10px"
                          />
                          <v-btn icon small @click="increment(item.id)" class="cartIcon">
                            <v-icon color="grey">mdi-plus</v-icon>
                          </v-btn>
                        </div>
                        <div class="itemAmount">
                          <span
                            v-if="item.isUser===false"
                            class
                          >{{ item.price * item.amount }} {{$store.state.cart.currency}}</span>
                        </div>
                        <div class="itemDelete">
                          <v-btn
                            v-if="item.isUser===false"
                            :disabled="item.loading===true"
                            small
                            icon
                            class="mx-0 cartIcon"
                            @click="remove(item.id)"
                          >
                            <v-icon color="grey lighten-1">mdi-trash-can-outline</v-icon>
                          </v-btn>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
              <div class="cartScreen">
                <template v-for="(item, index) in cartItems">
                  <!-- made by jin tai -->
                  <!-- <v-divider :key="index" v-if="index!==0"></v-divider> -->
                  <!-- About Windows Version -->
                  <v-list-item :key="index" v-bind:class="{ usritem: item.isUser }">
                    <v-avatar :tile="true">
                      <v-img :src="item.picture"></v-img>
                    </v-avatar>
                    <v-list-item-content style="margin-left:10px">
                      <v-row v-if="item.isUser===false">
                        <v-col md="10" lg="10" sm="12" xs="12">
                          <v-list-item-title>{{item.dish}}</v-list-item-title>
                          <v-list-item-subtitle>{{item.price}} {{$store.state.cart.currency}} X {{item.amount}}</v-list-item-subtitle>
                        </v-col>
                        <v-col md="2" lg="2" sm="12" xs="12">
                          <v-btn icon small @click="decrement(item.id)">
                            <v-icon color="grey">mdi-minus</v-icon>
                          </v-btn>
                          <input
                            type="number"
                            class="amount"
                            readonly
                            min="1"
                            :value="item.amount"
                            width="30px"
                          />
                          <v-btn icon small @click="increment(item.id)">
                            <v-icon color="grey">mdi-plus</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                      <v-row v-if="item.isUser===true">
                        <v-col md="10" lg="10">
                          <v-list-item-title>
                            {{item.name}}
                            <span v-if="item.id===$store.state.login.userId">(You)</span>
                          </v-list-item-title>
                        </v-col>
                      </v-row>
                    </v-list-item-content>
                    <span
                      v-if="item.isUser===false"
                      style="width:75px"
                    >{{ item.price * item.amount }} {{$store.state.cart.currency}}</span>
                    <v-btn
                      v-if="item.isUser===false"
                      :disabled="item.loading===true"
                      small
                      icon
                      class="mx-0"
                      @click="remove(item.id)"
                    >
                      <v-icon color="grey lighten-1">mdi-trash-can-outline</v-icon>
                    </v-btn>
                  </v-list-item>
                </template>
              </div>
            </v-list>
          </perfect-scrollbar>
          <v-card-actions>
            <v-spacer></v-spacer>
            <span
              style="margin-right:10px"
            >{{$t('head.totalPrice')}}: {{getTotalPrice}} {{$store.state.cart.currency}}</span>
            <v-btn
              class="ma-0"
              color="primary"
              nuxt
              :to="{ name: 'checkout', params: { lang: $router.currentRoute.params.lang}}"
            >{{$t('head.checkout')}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Menu extends Vue {
  settings: any = {};
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
    },
    {
      text: this.$root.$i18n.t("head.cartActions"),
      sortable: false
    }
  ];

  get getTotalPrice() {
    return this.cartItems.reduce(
      (a, c) => (a += !c.isUser ? c.price * c.amount : 0),
      0
    );
  }

  get cartItems(): any[] {
    let uid = this.$store.state.login.userId;
    let c = this.$store.state.cart.users.reduce((a, b) => {
      let user = Object.assign({}, b);
      delete user.cart;
      user.isUser = true;
      return a.concat([
        user,
        ...b.cart.map(o => {
          var _ = {};
          Object.assign(_, o, { userId: b.id, isUser: false });
          return _;
        })
      ]);
    }, []);
    return c;
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

  confirm(id: string) {
    this.$store.dispatch("cart/confirmDish", id);
  }

  unconfirm(id: string) {
    this.$store.dispatch("cart/unconfirmDish", id);
  }
}
</script>

<style scoped>
input.amount {
  width: 40px;
  text-align: center;
}
input.amount:focus {
  outline: none;
}

.usritem {
  background-color: #dedede !important;
}

.v-list-item__content {
  padding: 0;
}
</style>