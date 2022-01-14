<template>
  <v-container fill-height>
    <div style="width: 100%;">
        <h2>{{$t("close_order.title")}}</h2>
        <div class="mg-top-20"></div>
        <v-list two-line>
          <template v-for="(cart, index) in cartItems">
            <v-list-item :key="index">
              <v-list-item-content>
                <v-list-item-title>{{cart.dish}}</v-list-item-title>
                <v-list-item-subtitle>{{cart.price}} {{$store.state.cart.currency}} X {{cart.amount}}</v-list-item-subtitle>
              </v-list-item-content>
              <span>{{cart.price*cart.amount}} {{$store.state.cart.currency}}</span>
            </v-list-item>
          </template>
        </v-list>
        <div class="mg-top-10"/>
        <v-btn class="card-btn" @click="gotoContinue()">
            <span style="color:white;">{{$t("close_order.close")}}</span>
        </v-btn>

        <div class="mg-top-10"/>
        <v-btn class="card-wbtn" @click="gotoEmail()">
            <span style="color:white;">{{$t("close_order.email")}}</span>
        </v-btn>

        <div class="mg-top-10"/>
        <v-btn class="card-wbtn" @click="gotoPrint()">
            <span style="color:white;">{{$t("close_order.print")}}</span>
        </v-btn>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";
import { addUser } from "@/apis/orders/user";
import { parseJwt } from "@/utils/parse-jwt";
import CartItem from "@/components/data/cart-item.vue";
import { BillRequestAsync } from '@/apis/datastore/user';

@Component({
  components: {
     CartItem
  },
  async asyncData(context) {
    
  }
})
export default class CloseOrder extends Vue {

  cartHead = [
    { text: "", align: "left", sortable: false, value: "picture" },
    {
      text: this.$root.$i18n.t("close_order.title"),
      value: "title",
      sortable: false
    },
    {
      text: this.$root.$i18n.t("close_order.close"),
      value: "close",
      sortable: false
    },
    {
      text: this.$root.$i18n.t("close_order.email"),
      value: "email",
      sortable: false
    },
    {
      text: this.$root.$i18n.t("close_order.print"),
      value: "print",
      sortable: false
    }
  ];

  data() { 
    return {
      cart_arr : [
        {
          id: 0,
          name : 'ok'
        },
        {
          id : 1,
          name : 'good'
        }
      ],
      SelectIdx : -1
    }
  }
  onClickedCard (idx) {
    this.SelectIdx = idx;
  }
  mounted() {

  }
  created() {
    console.log(this.$router.currentRoute.params.lang)
    
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
  gotoContinue () {
    var lang = this.$router.currentRoute.params.lang
    
    var info = {
      orderId : this.$store.state.cart.orderId,
      print : false,
      send : false
    }
    BillRequestAsync(info, this.$store.state.login.auth).then(result => {
      this.$router.push({ name: "menu", params: {id : this.$store.state.cart.restaurantId, lang: lang} });
    }).catch(error => {
      console.log(error)
    })
  }
  gotoEmail() {

  }
  gotoPrint () {

  }
}
</script>
<style scoped>
  .card-btn {
      width: 100%;
      height: 50px;
      background: #ce1f28 !important;
  }
  @media (min-width: 961px) {
    .card-btn {
      width: 50%;
      height: 50px;
    }
  }
  .card-wbtn {
      width: 100%;
      height: 50px;
      background: #c1c1c1 !important;
  }
  @media (min-width: 961px) {
    .card-wbtn {
      width: 50%;
      height: 50px;
    }
  }
  .card-input {
    width: 100%;
    min-height: 60px;
    border : 1px solid #c1c1c1;
    border-radius: 5px;
    margin: auto;
    padding: 10px;
  }
  @media (min-width: 961px) {
    .card-input {
        min-height: 60px;
        width: 50%;
        border : 1px solid #c1c1c1;
        margin: 0 !important;
        border-radius: 5px;
        padding: 10px;
    }
  }
  .sel_card {
    background: red;
  }
  .normal_card {
    background: blue;
  }
</style>