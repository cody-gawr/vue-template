<template>
  <v-card>
    <v-container grid-list-xl>
      <v-layout row wrap>
        <v-flex md12 lg12>
          <v-layout wrap>
            <v-flex md12 lg7>
              <v-carousel :hide-delimiters="true">
                <v-carousel-item
                  v-for="(item,i) in restaurant.images"
                  :key="i"
                  :src="item"
                  reverse-transition="fade-transition"
                  transition="fade-transition"
                ></v-carousel-item>
              </v-carousel>
            </v-flex>
            <v-flex md12 lg5 class="no-lr-pad">
              <v-flex md12 lg12 class="no-tb-pad">
                <h1>{{restaurant.name[0].value}}</h1>
              </v-flex>
              <v-flex md12 lg12 class="no-tb-pad text-address">
                <v-icon small>mdi-map-marker</v-icon>
                <span>{{restaurant.address[0].value}}</span>
              </v-flex>
              <v-flex md12 lg12 class="no-tb-pad">
                <v-rating
                  class="rating-t"
                  :dense="true"
                  v-model="restaurant.avaregeVotes"
                  readonly
                  half-increments
                />
                <span>{{restaurant.avaregeVotes}}</span>
              </v-flex>
              <v-flex md12 lg12 class="no-tb-pad">
                <v-icon>mdi-clock-outline</v-icon>
                <span>{{restaurant.time}}</span>
              </v-flex>
              <v-flex class="no-tb-pad" md12 lg12>
                <br />
                <p>{{restaurant.description[0].value}}</p>
              </v-flex>
              <v-flex>
                <v-btn
                  color="primary"
                  width="100%"
                  nuxt
                  :to="{ name: 'menu', params: { lang: $router.currentRoute.params.lang, id: restaurant.key}}"
                >
                  <v-icon left>mdi-food-fork-drink</v-icon>
                  {{$t('restaurantDetail.menu')}}
                </v-btn>
              </v-flex>
              <!-- <v-flex>
                 <v-layout row>
                  <v-flex md12 lg6>
                    <v-btn width="100%" :href="`tel:${restaurant.contacts.telephone}`">
                      <v-icon left>mdi-phone</v-icon>
                      {{$t('restaurantDetail.call')}}
                    </v-btn>
                  </v-flex>
                  <v-flex md12 lg6>
                    <v-btn width="100%" :href="`mailto:${restaurant.contacts.email}`">
                      <v-icon left>mdi-email</v-icon>
                      {{$t('restaurantDetail.send')}}
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-flex>-->
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>


<script lang="ts">
import { Component, Vue, Prop, Provide } from "vue-property-decorator";

@Component
export default class RestaurantCore extends Vue {
  @Prop() restaurant!: any;
}
</script>