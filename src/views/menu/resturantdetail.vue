<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex md12 lg9>
        <v-layout row wrap>
          <v-flex>
            <RestaurantCore :restaurant="restaurant" />
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex
            xs12
            sm12
            md12
            lg4
            v-if="restaurant.content1 !== undefined && restaurant.content1 !== null"
          >
            <ContentBottom :data="restaurant.content1"></ContentBottom>
          </v-flex>
          <v-flex
            xs12
            sm12
            md12
            lg4
            v-if="restaurant.content2 !== undefined && restaurant.content2 !== null"
          >
            <ContentBottom :data="restaurant.content2"></ContentBottom>
          </v-flex>
          <v-flex
            xs12
            sm12
            md12
            lg4
            v-if="restaurant.content3 !== undefined && restaurant.content3 !== null"
          >
            <ContentBottom :data="restaurant.content3"></ContentBottom>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex md12 lg3>
        <Details :details="restaurant.details"></Details>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";
import RestaurantCore from "@/components/data/restaurant-core.vue";
import ContentBottom from "@/components/global/content-bottom.vue";
import Details from "@/components/global/details.vue";
import { getRestaurant } from "@/apis/datastore/restaurant";

@Component({
  async asyncData(context) {
    const { data } = await getRestaurant(
      context.route.params.lang || "en",
      context.route.params.id
    );
    return { restaurant: data };
  },
  components: {
    RestaurantCore,
    ContentBottom,
    Details
  }
})
export default class RestaurantDetail extends Vue {}
</script>

<style lang="scss">
.rating-t {
  display: inline-flex;
}

* {
  color: #514d6a;
}

.accordion-title span {
  font-size: 18px;
}

.text-address,
.text-address span {
  color: #a5a5a5;
  text-transform: uppercase;
}

.no-tb-pad {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
  margin-bottom: 6px;
}

.no-lr-pad {
  padding-left: 0px !important;
  padding-right: 0px !important;
}
</style>