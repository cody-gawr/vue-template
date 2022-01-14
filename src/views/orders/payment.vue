<template>
  <v-container fill-height>
    <div style="width: 100%;">
      <div class="mg-top-20"></div>
      <h2>{{$t("payment.title")}}</h2>
      <div class="mg-top-20"></div>
      <v-layout v-for="(card, i) in card_arr" :key="i">
        <CardItem
          v-on:onSelected="onClickedCard"
          :card="card"
          :isSelected="SelectIdx"
          :idx="i"
          :isDelete="false"
        ></CardItem>
      </v-layout>

      <v-btn class="card-btn" @click="gotoManageCards()">
        <v-icon left color="white">mdi-credit-card</v-icon>
        <span style="color:white;">{{$t("payment.managebutton")}}</span>
      </v-btn>

      <div class="mg-top-20" />
      <h2>{{$t("payment.payment")}}</h2>
      <div class="mg-top-10" />
      <v-layout class="card-input">
        <v-col cols="12">
          <v-col cols="12" style="display:flex;">
            <p class="p-class">{{$t('payment.card_number')}} :</p>
            <input
              type="text"
              id="number"
              name="number"
              maxlength="16"
              class="bottom_line"
              placeholder="4242 4242 4242 4242"
              style="width:250px;"
            />
          </v-col>
          <v-col cols="12" style="display:flex;">
            <p class="p-class">{{$t('payment.card_expiry')}} :</p>
            <input
              type="text"
              id="expiry"
              placeholder="MM/YY"
              name="expiry"
              maxlength="5"
              class="bottom_line"
              style="width:250px;"
            />
          </v-col>
          <v-col cols="12" style="display:flex;">
            <p class="p-class">CVC :</p>
            <input
              type="text"
              id="cvc"
              name="cvv"
              class="bottom_line"
              maxlength="3"
              style="width:250px;"
            />
          </v-col>
        </v-col>
      </v-layout>
      <div class="mg-top-10" />
      <v-btn :href="`#`" class="card-btn" @click="onPay()">
        <v-icon left color="white">mdi-credit-card</v-icon>
        <span style="color:white;">{{$t("payment.pay")}}</span>
      </v-btn>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";
import { addUser } from "@/apis/orders/user";
import { parseJwt } from "@/utils/parse-jwt";
import { updateUser, getUser } from "@/apis/datastore/user";

import {
  getPaymentMethodList,
  payRegisteredCard,
  payUnregisteredCard
  //payMethodByCardInfo
} from "@/apis/orders/payment";
import CardItem from "@/components/data/card-item.vue";
import $ from "jquery";

let elements;
let card;

let customerId;
let price;
@Component({
  components: {
    CardItem
  }
})
export default class Payment extends Vue {
  card_arr = [];
  SelectIdx = -1;

  onClickedCard(idx) {
    this.onClear();
    this.SelectIdx = idx;
  }
  async mounted() {
    price = this.$router.currentRoute.params.price;
    let a = parseJwt(this.$store.state.login.auth);
    if (typeof a.id === "string" && a.id !== "") {
      const { data } = await getUser(a.id);
      if (data.profile === null) data.profile = {};

      customerId = data.stripeId;
      if (customerId != null) {
        getPaymentMethodList(customerId)
          .then(result => {
            this.card_arr = result.data.data;
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
  gotoManageCards() {
    var lang = this.$router.currentRoute.params.lang;
    this.$router.push({ name: "add-payment", params: { lang: lang } });
  }
  onClear() {
    $("#number").val("");
    $("#expiry").val("");
    $("#cvc").val("");
  }
  onPay() {
    if (typeof(price) == 'undefined')
    {
      price = window.localStorage.getItem('totalPrice') 
    }
    var card_info: any = {};
    var dishInfo = []
    for (var i = 0 ;i < this.$store.state.cart.users.length ;i++) {
      var user_data = this.$store.state.cart.users[i]
      
      if (user_data.id == this.$store.state.login.userId) {
        for (var j = 0 ;j < user_data.cart.length ; j++) {
          dishInfo.push(user_data.cart[j].id)
        }
        break;
      }
    }
    var order_info = {
        orderId : this.$store.state.cart.orderId,
        userId : this.$store.state.login.userId,
        dishIds : dishInfo
    }

    if (
      $("#number").val() != "" &&
      $("#expiry").val() != "" &&
      $("#cvc").val() != ""
    ) {
      var expiry = $("#expiry").val();
      var month = expiry.split("/")[0];
      var year = expiry.split("/")[1];

      card_info = {
        number: $("#number").val(),
        exp_month: month,
        exp_year: year,
        cvc: $("#cvc").val()
      };
      var card = {
          number : card_info.number,
          expMonth : card_info.exp_month,
          expYear : card_info.exp_year,
          cvc : card_info.cvc,
      }
      
      var pay_data = {
          card : card,
          orderInfo : order_info,
          register : true,
          currency : 'jpy',
          amount : price,
          customer : customerId,
          destination : this.$store.state.cart.accountId///global.accountId
      }
      console.log(pay_data)
      payUnregisteredCard(pay_data,this.$store.state.login.auth).then(result => {
        var lang = this.$router.currentRoute.params.lang;
        window.localStorage.setItem('totalPrice','')
        this.$router.push({
          name: "payment-result",
          params: { lang: lang, message: 'Pay was successful.' }
        });
      }).catch(error=> {
        console.log(error.message)
      })
    } else if (this.SelectIdx != -1) {
      var item: any = this.card_arr[this.SelectIdx];
      var info = {
          customer : customerId,
          paymentMethod : item.id,
          currency : 'jpy',
          amount : price,
          orderInfo : order_info,
          destination : this.$store.state.cart.accountId//'acct_1FdYR3IKo7ccuh47'///global.accountId
      }
      console.log(info)
      payRegisteredCard(info , this.$store.state.login.auth).then(result => {
        console.log(result)
        var lang = this.$router.currentRoute.params.lang;
        window.localStorage.setItem('totalPrice','')
        this.$router.push({
          name: "payment-result",
          params: { lang: lang, message: 'Pay was successful.' }
        });
      }).catch(error => {
        console.log(error)
      })
    } else {
      console.log("You have to select card.");
      return;
    }
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
.card-input {
  width: 100%;
}
@media (min-width: 961px) {
  .card-input {
    width: 50%;
  }
}
.bottom_line {
  outline: none;
  border-bottom: 1px solid #b9b7b7;
  margin-left: 2vw;
}
.p-class {
  margin: auto;
  margin-left: 0px;
}
.flex {
  display: flex;
}
</style>