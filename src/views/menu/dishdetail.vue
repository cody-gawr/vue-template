<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex md12 lg9>
        <v-layout row wrap>
          <v-flex>
            <DishCore :dish="dish" />
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm12 md12 lg4 v-if="dish.content1 !== undefined && dish.content1 !==null">
            <ContentBottom :data="dish.content1"></ContentBottom>
          </v-flex>
          <v-flex xs12 sm12 md12 lg4 v-if="dish.content2 !== undefined && dish.content2 !==null">
            <ContentBottom :data="dish.content2"></ContentBottom>
          </v-flex>
          <v-flex xs12 sm12 md12 lg4 v-if="dish.content3 !== undefined && dish.content3 !==null">
            <ContentBottom :data="dish.content3"></ContentBottom>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex md12 lg3>
        <Details :details="dish.details"></Details>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";
import DishCore from "@/components/data/dish-core.vue";
import ContentBottom from "@/components/global/content-bottom.vue";
import Details from "@/components/global/details.vue";
import { getDish } from "@/apis/datastore/dish";

@Component({
  async asyncData(context) {
    const { data } = await getDish(
      context.route.params.lang || "en",
      context.route.params.id,
      context.route.params.a
    );
    return { dish: data };
  },
  components: {
    DishCore,
    ContentBottom,
    Details
  }
})
export default class DishDetail extends Vue {}
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