<template>
  <v-container fill-height>
    <div style="width: 100%;height:100%;">
      <div class="mg-top-50"></div>

      <h2>{{$t("payment_cash.title")}}</h2>

      <div class="mg-top-20"></div>
      <span
        class="description"
      >This is Pay cash description.This is Pay cash description.This is Pay cash description.This is Pay cash description.This is Pay cash description.This is Pay cash description.This is Pay cash description.This is Pay cash description.</span>
      <div class="mg-top-50"></div>

      <v-btn class="card-btn">
        <v-icon left color="white">mdi-credit-card</v-icon>
        <span style="color:white;">{{$t("payment_cash.button")}}</span>
      </v-btn>

      <div class="mg-top-20" />
      <div class="cash-log">
        <p style="text-align:center;padding-top: 20px;">SMAIL LOG</p>
      </div>

      <div class="mg-top-50" />
      <div class="cash-log">
        <p style="text-align:center;padding-top: 20px;">Payment Success!</p>
      </div>

      <div style="margin-top:30vh;" />

      <v-btn :href="`#`" class="card-btn" @click="onNext()">
        <span style="color:white;">{{$t("payment_cash.next")}}</span>
        <v-icon right color="white">mdi-arrow-right-thick</v-icon>
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
  getAllPaymentMethodsByid,
  payMethodByCardInfo
} from "@/apis/orders/payment";

@Component
export default class PaymentCash extends Vue {

  onNext() {
    var lang = this.$router.currentRoute.params.lang;
    this.$router.push({ name: "payment-cash-result", params: { lang: lang } });
  }
}

</script>
<style scoped>
.card-btn {
  width: 100%;
  height: 50px;
  background: #ce1f28 !important;
}
.description {
  width: 100%;
}
.cash-log {
  width: 100%;
  min-height: 60px;
  background: white;
  box-shadow: 0px 3px 3px 1px #bfbfbf;
}
@media (min-width: 961px) {
  .card-btn {
    width: 50%;
    height: 50px;
  }
  .description {
    width: 50%;
    display: block;
  }
  .cash-log {
    width: 50%;
  }
}
.next {
  position: absolute;
  bottom: 10px;
}
</style>