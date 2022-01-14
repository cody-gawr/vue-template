<template>
  <v-flex xs12 sm6 md3>
    <v-card class="elevation-1" height="440">
      <nuxt-link
        :to="{ name: 'dish', params: { lang: $router.currentRoute.params.lang, id: dish.key, a:dish.arch !== undefined ? dish.arch.archId :undefined}}"
      >
        <v-img :src="dish.images[0]" height="250"></v-img>
      </nuxt-link>
      <nuxt-link
        style="text-decoration:none"
        :to="{ name: 'dish', params: { lang: $router.currentRoute.params.lang, id: dish.key, a:dish.arch !== undefined ? dish.arch.archId :undefined}}"
      >
        <v-card-title style="min-height: 88px;align-items: start;">{{dish.name[0].value}}</v-card-title>
      </nuxt-link>
      <v-card-text style="padding: 0 0 0 16px;">
        <div style="margin-bottom: 5px;">
          <b>{{$t('menu.price')}}</b>
          <span>{{dish.arch.price.value}} {{dish.arch.price.currency}}</span>
        </div>
        <Allergens :allergens="dish.allergens||{}"></Allergens>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          small
          icon
          nuxt
          :to="{ name: 'dish', params: { lang: $router.currentRoute.params.lang, id: dish.key, a:dish.arch !== undefined ? dish.arch.archId :undefined}}"
        >
          <v-icon>mdi-dots-horizontal-circle-outline</v-icon>
        </v-btn>
        <v-btn
          v-if="$store.state.cart.orderId !== null && $store.state.cart.orderId !== '' && 
                $store.state.login.auth !==null && $store.state.login.auth !=='' &&
                dish.arch.restaurantId == $store.state.cart.restaurantId"
          small
          icon
          @click="addToCart(dish)"
        >
          <v-icon>mdi-cart-plus</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { consoleInfo } from "vuetify/src/util/console";
import { OrderItem } from "@/store/cart";
import Allergens from "@/components/global/allergens.vue";
@Component({
  components: {
    Allergens
  }
})
export default class MenuListItem extends Vue {
  @Prop() dish!: any;

  addToCart(dish: any) {
    let o = {
      orderId: this.$store.state.cart.orderId,
      id: dish.arch.archId,
      dish: dish.name[0].value,
      picture: dish.images[0],
      amount: 1,
      price: dish.arch.price.value,
      status: 1,
      note: "",
      paid: false,
      number: 0,
      currency: dish.arch.price.currency
    } as OrderItem;
    this.$store.dispatch("cart/addDish", o);
  }
}
</script>

<style lang="scss">
/**/

.list-item-1 {
  width: 100%;
}

.list-item-2 {
  position: relative;
}

.list-item-2 .hoverImg {
  position: absolute;
  right: 0;
  top: 0;
  display: block;
  padding: 5px;
}
</style>