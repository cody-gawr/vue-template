<template>
  <v-flex xs12 sm12 md6>
    <div class="card-item" @click="onSelect()">
      <v-flex md10>
        <div class="card-body">
          <div class="card-number">
            <div style="display : flex;">
                Macaroni                
            </div>
            <p class="card-expiry no-bottom">450 X 3 USD</p>
          </div>
          <div class="total-price">
              1230 USD
          </div>
        </div>
      </v-flex>      
    </div>
  </v-flex>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Provide } from "vue-property-decorator";
    @Component
    export default class CartItem extends Vue {
      
      @Prop() cart!: any;
      @Prop() isSelected! : number;
      @Prop() idx! : number;

      created() {
        
      }
      onSelect (val : object) {
        //alert(JSON.stringify(this.card))
        //alert('OKS')
        this.$emit('onSelected', this.cart.id)
      }
    }
</script>
<style scoped>
  .card-item {
    width: 100%;
    height: 55px;
    display: flex;
    background: whitesmoke;
    margin-bottom: 20px;
    box-shadow: 3px 5px 5px 0px #e0e0e0;
    cursor: pointer;
    
  }
  .card-body {
    display: flex;
    padding-left:  15px;
  }
  .security {
    display: flex;
    margin-right: 10px;
  }
  .card-text {
    font-size: 16px;
    color :gray;
  }
  .no-bottom {
    margin-bottom: 0px;
  }
  .total-price {
    margin : auto;
    margin-right: 10px;
  }
</style>