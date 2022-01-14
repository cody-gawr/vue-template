<template>
  <v-card>
    <v-container grid-list-xl>
      <v-layout row wrap>
        <v-flex md12 lg12>
          <v-layout wrap>
            <v-flex md12 lg7>
              <v-carousel :hide-delimiters="true">
                <v-carousel-item
                  v-for="(item,i) in dish.images"
                  :key="i"
                  :src="item"
                  reverse-transition="fade-transition"
                  transition="fade-transition"
                ></v-carousel-item>
              </v-carousel>
            </v-flex>
            <v-flex md12 lg5 class="no-lr-pad">
              <v-flex md12 lg12 class="no-tb-pad">
                <h1 style="line-height: 1.1">{{dish.name[0].value}}</h1>
              </v-flex>
              <v-flex md12 lg12 class="no-tb-pad">
                <h3>{{dish.subTitle[0].value}}</h3>
              </v-flex>
              <v-flex md12 lg12 class="no-tb-pad text-address">
                <span>
                  <v-icon small>mdi-map-marker</v-icon>
                  {{dish.from[0].value}}
                </span>
              </v-flex>
              <v-flex
                v-if="dish.superset !==null && dish.superset !==undefined"
                md12
                lg12
                class="no-tb-pad text-address"
              >
                <span>
                  <v-icon small>mdi-file-tree</v-icon>
                  {{dish.superset[0].value}}
                </span>
              </v-flex>
              <v-flex
                v-if="dish.category !==null && dish.category !==undefined"
                md12
                lg12
                class="no-tb-pad"
              >
                <nuxt-link
                  :to="{ name: 'dish', params: { lang: $router.currentRoute.params.lang, id: dish.category.id}}"
                >
                  <span>
                    <v-icon small>mdi-file-tree</v-icon>
                    {{dish.category.text[0].value}}
                  </span>
                </nuxt-link>
              </v-flex>
              <v-flex v-if="dish.ingredients.length>0" md12 lg12 class="no-tb-pad">
                <span
                  style="display: inline-block;margin-bottom:4px;"
                >{{$t('dishDetail.ingredients')}}</span>
                <div>
                  <v-chip
                    v-for="(item, i) in dish.ingredients"
                    :key="i"
                    class="label"
                    color="primary"
                    label
                  >
                    <nuxt-link
                      :to="{ name: 'ingredient', params: { lang: $router.currentRoute.params.lang, id: item.key}}"
                    >{{item.name[0].value}}</nuxt-link>
                  </v-chip>
                </div>
              </v-flex>
              <v-flex md12 lg12 class="no-tb-pad">{{dish.description[0].value}}</v-flex>
              <v-flex md12 lg12 class="no-tb-pad">
                <Allergens :allergens="dish.allergens"></Allergens>
              </v-flex>
              <v-flex md12 lg12 class="no-tb-pad">
                <span v-if="dish.arch !==null">
                  <b>{{$t('menu.price')}}</b>
                  {{dish.arch.price.value}} {{dish.arch.price.currency}}
                </span>
              </v-flex>
              <v-flex>
                <v-btn
                  v-if="$store.state.cart.orderId !== null && $store.state.cart.orderId !== '' && 
                  $store.state.login.auth !==null && $store.state.login.auth !=='' &&
                  dish.arch !==null && dish.arch.restaurantId === $store.state.cart.restaurantId"
                  color="primary"
                  width="100%"
                  @click="addToCart(dish)"
                >
                  <v-icon left>mdi-cart-arrow-down</v-icon>
                  {{$t('dishDetail.addToOrder')}}
                </v-btn>
              </v-flex>
              <v-flex>
                <v-layout row>
                  <v-flex md12 lg6>
                    <v-btn width="100%" :href="`#`">
                      <v-icon left>mdi-account-multiple-plus</v-icon>
                      {{$t('dishDetail.tryWithFriend')}}
                    </v-btn>
                  </v-flex>
                  <v-flex md12 lg6>
                    <v-btn width="100%" :href="`#`">
                      <v-icon left>mdi-file-outline</v-icon>
                      {{$t('dishDetail.readRecipe')}}
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>


<script lang="ts">
import { Component, Vue, Prop, Provide } from "vue-property-decorator";
import { OrderItem } from "@/store/cart";
import Allergens from "@/components/global/allergens.vue";

@Component({
  components: {
    Allergens
  }
})
export default class DishCore extends Vue {
  @Prop() dish!: any;

  @Prop() sxLnk!: string;

  @Prop() dxLnk!: string;

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

<style >
span.label {
  margin-right: 2px;
  margin-bottom: 2px;
}

span.label a {
  color: white !important;
  text-decoration: none;
}
</style>>