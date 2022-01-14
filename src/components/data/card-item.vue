<template>
  <v-flex xs12 sm12 md6>
    <div
      class="card-item"
      @click="onSelect"
      :class="isSelected === idx && !isDelete ? 'active' : ''"
    >
      <div>
        <p class="pf card-icon" v-bind:class="[cardIcon]"></p>
      </div>
      <v-flex md10>
        <div class="card-body">
          <div class="card-number">
            <div style="display : flex;">
              <div class="security">
                <v-icon left class="security-icon">mdi-asterisk</v-icon>
                <v-icon left class="security-icon">mdi-asterisk</v-icon>
                <v-icon left class="security-icon">mdi-asterisk</v-icon>
                <v-icon left class="security-icon">mdi-asterisk</v-icon>
              </div>

              <div class="security">
                <v-icon left class="security-icon">mdi-asterisk</v-icon>
                <v-icon left class="security-icon">mdi-asterisk</v-icon>
                <v-icon left class="security-icon">mdi-asterisk</v-icon>
                <v-icon left class="security-icon">mdi-asterisk</v-icon>
              </div>

              <div class="security">
                <v-icon left class="security-icon">mdi-asterisk</v-icon>
                <v-icon left class="security-icon">mdi-asterisk</v-icon>
                <v-icon left class="security-icon">mdi-asterisk</v-icon>
                <v-icon left class="security-icon">mdi-asterisk</v-icon>
              </div>
              <p class="card-text no-bottom">{{card.card.last4}}</p>
            </div>

            <p class="card-expiry no-bottom">{{card.card.exp_month}}/{{card.card.exp_year}}</p>
          </div>
          <div></div>
        </div>
      </v-flex>
      <div v-show="isDelete" style="width : 50px;" @click="onDelete(idx)">
        <v-icon color="grey lighten-1" class="trash">mdi-trash-can-outline</v-icon>
      </div>
    </div>
  </v-flex>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide } from "vue-property-decorator";
@Component
export default class CardItem extends Vue {
  @Prop() card!: any;
  @Prop() isSelected!: number;
  @Prop() idx!: number;
  @Prop() isDelete!: boolean;

  created() {}
  onSelect() {
    this.$emit("onSelected", this.idx);
  }
  onDelete(idx: number) {
    console.log(idx);
    this.$emit("onDelete", idx);
  }

  get cardIcon() {
    return `pf-${this.card.card.brand}`;
  }
}
</script>
<style scoped>
.card-icon {
  font-size: 30px;
  margin: 13px 10px 0px 10px;
}

.card-item {
  width: 100%;
  height: 55px;
  display: flex;
  background: whitesmoke;
  margin-bottom: 20px;
  box-shadow: 3px 5px 5px 0px #e0e0e0;
  cursor: pointer;
}
.active {
  border: 1px solid #ce1e28;
}
.card-body {
  display: block;
  padding-left: 10px;
}
.security {
  display: flex;
  margin-right: 10px;
}
.card-text {
  font-size: 16px;
  color: gray;
}
.no-bottom {
  margin-bottom: 0px;
}
.card-expiry {
  font-size: 14 px;
}
.security-icon {
  font-size: 13px;
  margin: 0px;
}
.icon {
  text-align: center;
  margin-top: 15px;
  text-align: center;
}
.trash {
  margin-top: 15px;
  margin-left: 10px;
}
</style>