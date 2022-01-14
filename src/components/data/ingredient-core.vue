<template>
  <v-card>
    <v-container grid-list-xl>
      <v-layout row wrap>
        <v-flex md12 lg12>
          <v-layout wrap>
            <v-flex md12 lg7>
              <v-carousel :hide-delimiters="true">
                <v-carousel-item
                  v-for="(item,i) in ingredient.images"
                  :key="i"
                  :src="item"
                  reverse-transition="fade-transition"
                  transition="fade-transition"
                ></v-carousel-item>
              </v-carousel>
            </v-flex>
            <v-flex md12 lg5 class="no-lr-pad">
              <v-flex md12 lg12 class="no-tb-pad">
                <h1>{{ingredient.name[0].value}}</h1>
              </v-flex>
              <v-flex md12 lg12 class="no-tb-pad">
                <h3>{{ingredient.subTitle[0].value}}</h3>
              </v-flex>
              <v-flex md12 lg12 class="no-tb-pad text-address">
                <v-icon small>mdi-map-marker</v-icon>
                <span>{{ingredient.from[0].value}}</span>
              </v-flex>
              <v-flex md12 lg12 class="no-tb-pad text-address">
                <v-icon small>mdi-file-tree</v-icon>
                <span>{{ingredient.superset[0].value}}</span>
              </v-flex>
              <v-flex class="no-tb-pad" md12 lg12>
                <p>{{ingredient.description[0].value}}</p>
                <Allergens :allergens="ingredient.allergens||{}"></Allergens>
              </v-flex>
              <v-flex>
                <v-btn color="primary" width="100%" :href="`#`">
                  <v-icon left>mdi-cart-arrow-down</v-icon>
                  {{$t('ingredientDetail.relatedRecipes')}}
                </v-btn>
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
import Allergens from "@/components/global/allergens.vue";

@Component({
  components: {
    Allergens
  }
})
export default class IngredientCore extends Vue {
  @Prop() lgBtn!: string;
  @Prop() lgLnk!: string;
  @Prop() ingredient!: any;
}
</script>