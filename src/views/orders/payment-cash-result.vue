<template>
  <v-container fill-height>
    <div style="width: 100%;height:100%;">
        <div class="mg-top-50"></div>
        
        <h2>{{$t("payment_cash_result.title")}}</h2>
        
        <div class="mg-top-50"></div>

        <v-btn class="card-btn" @click="gotoContinue()">
            <span style="color:white;">{{$t("payment_cash_result.continue")}}</span>
        </v-btn>
        
        <div class="mg-top-20"/>
        
        <v-btn class="card-btn" style="background : #afafaf !important;" @click="gotoClose()">
            <span style="color:white;">{{$t("payment_cash_result.close")}}</span>
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
import { getAllPaymentMethodsByid ,payMethodByCardInfo} from '@/apis/orders/payment';

@Component
export default class PaymentCashResult extends Vue {
  cartHead = [
    { text: "", align: "left", sortable: false, value: "picture" },
    {
      text: this.$root.$i18n.t("payment_cash_result.title"),
      value: "title",
      sortable: false
    },
    {
      text: this.$root.$i18n.t("payment_cash_result.continue"),
      value: "button",
      sortable: false
    },
    {
      text: this.$root.$i18n.t("payment_cash_result.close"),
      value: "next",
      sortable: false
    }
  ];

  gotoContinue () {
    var lang = this.$router.currentRoute.params.lang
    this.$router.push({ name: "menu", params: { id: this.$store.state.cart.restaurantId , lang: lang} });
  }
  gotoClose () {
    var lang = this.$router.currentRoute.params.lang
    this.$router.push({ name: "close-order", params: { lang: lang} });
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