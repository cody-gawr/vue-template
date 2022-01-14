<template>
  <v-flex xs12 sm6 md2>
    <div class="list-item-2">
      <div class="imageInn"></div>
      <div class="hoverImg">
        <v-icon color="red" v-if="true">mdi-heart</v-icon>
        <v-icon color="white" v-else>mdi-heart-outline</v-icon>
      </div>
    </div>

    <v-flex md12 style="padding: 0px 0px 5px 0px;">
      <b>Name Resturant, Name Resturant</b>
    </v-flex>

    <v-flex md12 style="padding: 0px 0px 5px 0px;">
      <v-icon>mdi-clock-outline</v-icon>
      <span>10:30 / 23:00</span>
      <v-icon>mdi-map-marker</v-icon>
      <span>3.7km</span>
    </v-flex>

    <v-flex md12 style="padding: 0px 0px 5px 0px;">
      <v-rating :defaultValue="3" />
    </v-flex>
  </v-flex>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class MenuListItem extends Vue {}
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