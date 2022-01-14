<template>
  <v-container fill-height>
    <div style="width: 100%;">
      <h2>{{$t("add_payment.title")}}</h2>
      <div class="mg-top-20"></div>
      <v-layout v-for="(card, i) in card_arr" :key="i">
        <CardItem v-on:onDelete ="removeCard" :card="card" :isSelected="SelectIdx" :idx="i" :isDelete="true"></CardItem>
      </v-layout>
      
      <div class="mg-top-20"></div>
      <h2>{{$t("add_card.title")}}</h2>

      <div class="mg-top-20"></div>
      <v-layout  class="card-input">
        <v-col cols="12">
          <v-col cols="12"  style="display:flex;">
            <p class="p-class">{{$t("payment.card_number")}} : </p>
            <input type="text" id="number" name="number" maxlength="16" class="bottom_line" placeholder="4242 4242 4242 4242"  style="width:250px;"/>
          </v-col>
          <v-col cols="12"  style="display:flex;">
            <p class="p-class">{{$t("payment.card_expiry")}} : </p>
            <input type="text" id="expiry" placeholder="MM/YY" name="expiry" maxlength="5" class="bottom_line" style="width:250px;"/>
          </v-col>
          <v-col cols="12"  style="display:flex;">
            <p class="p-class">CVV : </p>
            <input type="text" id="cvc" name="cvv" class="bottom_line" maxlength="3"  style="width:250px;"/>
          </v-col>
        </v-col>
      </v-layout>
      <div class="mg-top-20"></div>
      <div class="flex">
        <v-btn :href="`#`" class="card-btn" @click="onAdd()">
          <span style="color:white;">{{$t("add_payment.button")}}</span>
        </v-btn>
        
        <v-btn :href="`#`" class="card-wbtn" @click="onClear()">
          <span style="color:#383838;">{{$t("add_card.cancel")}}</span>
        </v-btn>
      </div>
    </div>
  </v-container>
</template>
<script src="../../lib/jquery.payment.js"></script>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";
import { addUser } from "@/apis/orders/user";
import { parseJwt } from "@/utils/parse-jwt";
import CardItem from "@/components/data/card-item.vue";
import { updateUser, getUser } from "@/apis/datastore/user";
import { getPaymentMethodList , removePayments, addPayment} from '@/apis/orders/payment';
import $ from "jquery";


let customerId;
@Component({
  components: {
      CardItem,
  },
  async asyncData(context) {
    
  }
})
export default class AddPayment extends Vue {

  cartHead = [
    { text: "", align: "left", sortable: false, value: "picture" },
    {
      text: this.$root.$i18n.t("add_payment.title"),
      value: "title",
      sortable: false
    },
    {
      text: this.$root.$i18n.t("add_payment.button"),
      value: "button",
      sortable: false
    },
    {
      text: this.$root.$i18n.t("payment.card_number"),
      value: "number",
      sortable: false
    },
    {
      text: this.$root.$i18n.t("payment.card_expiry"),
      value: "expiry",
      sortable: false
    },
    {
      text: this.$root.$i18n.t("add_card.title"),
      value: "subtitle",
      sortable: false
    },
    {
      text: this.$root.$i18n.t("add_card.cancel"),
      value: "cancel",
      sortable: false
    }
  ];

  data() { 
    return {
      card_arr : [],
      SelectIdx : -1
    }
  }
  onClickedCard (idx) {
    this.SelectIdx = idx;
  }
  async mounted() {
    this.reloadData()
  }
  
  created() {
  }

  removeCard (idx) {
    removePayments(this.card_arr[idx].id).then(result => {
      this.reloadData()
    })
  }
  async reloadData () {
    let a = parseJwt(this.$store.state.login.auth);
    if (typeof a.id === "string" && a.id !== "") {
      const { data } = await getUser(a.id);
      if (data.profile === null) data.profile = {};
      customerId = data.stripeId
      if (customerId != null) {
        getPaymentMethodList(customerId).then(result => {
          this.card_arr = result.data.data;
        }).catch(error => {
          console.log(error)
        })
      }    
    }
  }

  onAdd () {
    var expiry = $('#expiry').val()
    var month = expiry.split('/')[0]
    var year = expiry.split('/')[1]

    var card_info = {
      number: $('#number').val(),
      expMonth: month,
      expYear: year,
      cvc: $('#cvc').val(),
    }

    var info = {
      customerId : customerId,
      card : card_info
    }
    
    addPayment(info , this.$store.state.login.auth).then(result => {
      this.onClear()
      this.reloadData()
    }).catch(error=> {
      alert(error.message)
      console.log(error)
    })
  }

  onClear () {
    $('#number').val('')
    $('#expiry').val('')
    $('#cvc').val('')
  }
}
</script>
<style scoped>
  .card-btn {
      width: 48%;
      height: 50px;
      margin-right: 4%;
      background: #ce1f28 !important;
  }
  @media (min-width: 961px) {
    .card-btn {
      width: 23%;
      margin-right: 4%;
      height: 50px;
    }
  }
  .card-wbtn {
      width: 48%;
      height: 50px;
      margin-right: 4%;
      background: #f5f5f5 !important;
  }
  @media (min-width: 961px) {
    .card-wbtn {
      width: 23%;
      margin-right: 4%;
      height: 50px;
    }
  }
  .card-input {
    width: 100%;
    box-shadow: 0px 1px 2px 2px #e4e3e3;
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