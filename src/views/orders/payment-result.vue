<template>
  <v-container fill-height>
    <div style="width: 100%;">
        <h2>{{$t("result_payment.title")}}</h2>
        <div class="mg-top-20"></div>

        <v-row  class="card-input">
            {{message}}
        </v-row>
        <div class="mg-top-10"/>
        <v-btn class="card-btn" @click="gotoContinue()">
            <span style="color:white;">{{$t("result_payment.continue")}}</span>
        </v-btn>
        <div class="mg-top-10"/>

        <v-btn class="card-btn" style="background : #afafaf !important;" @click="gotoClose()">
            <span style="color:white;">{{$t("result_payment.close")}}</span>
        </v-btn>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";
import { addUser } from "@/apis/orders/user";
import { parseJwt } from "@/utils/parse-jwt";
import CardItem from "@/components/data/card-item.vue";

@Component({
  components: {
     CardItem
  },
  async asyncData(context) {
    
  }
})
export default class PaymentResult extends Vue {

  cartHead = [
    { text: "", align: "left", sortable: false, value: "picture" },
    {
      text: this.$root.$i18n.t("result_payment.title"),
      value: "title",
      sortable: false
    },
    {
      text: this.$root.$i18n.t("result_payment.continue"),
      value: "continue",
      sortable: false
    },
    {
      text: this.$root.$i18n.t("result_payment.close"),
      value: "close",
      sortable: false
    },
  ];

  data() { 
    return {
      message : ''
    }
  }
  onClickedCard (idx) {
    this.SelectIdx = idx;
  }
  mounted() {
  }
  created() {
    this.message = this.$router.currentRoute.params.message
  }
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
  @media (min-width: 961px) {
    .card-btn {
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