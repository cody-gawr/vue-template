<template>
  <v-container fill-height style="height: calc(100vh - 58px);">
    <v-layout align-center>
      <v-flex text-center>
        <h1 class="display-2 primary--text">Loading...</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";
import { addUser } from "@/apis/orders/user";
import { parseJwt } from "@/utils/parse-jwt";

@Component({
  async asyncData(context) {}
})
export default class QR extends Vue {
  created() {
    var id = this.$router.currentRoute.params.id;
    this.$store.commit("qr/set", {
      restaurantId: this.$router.currentRoute.params.id,
      key: this.$router.currentRoute.params.key,
      table: this.$router.currentRoute.params.tid,
      timestamp: +new Date()
    });
    if (typeof this.$store.state.login.auth === "string") {
      addUser(
        this.$router.currentRoute.params.id,
        this.$router.currentRoute.params.tid
      ).then(o => {
        this.$store.commit("cart/setOrderId", o.data.id);
        this.$store.commit("cart/setRestaurantId", id);
        this.$store.commit(
          "cart/setTableId",
          this.$router.currentRoute.params.tid
        );
        var lang = this.$router.currentRoute.params.lang;
        this.$router.push({ name: "menu", params: { lang: lang, id: id } });
      });
    } else {
      var lang = this.$router.currentRoute.params.lang;
      this.$router.push({
        name: "login",
        params: { lang: lang, id: id },
        query: { redirect: "qr" }
      });
    }
  }
}
</script>
