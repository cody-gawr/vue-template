<template>
  <div style="min-height: 24px;">
    <span v-show="allergens !==undefined && allergens !==null && allergens.celery === true">
      <span>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <i class="flaticon-celery" v-on="on"></i>
          </template>
          <span style="color: #fff;">{{$t('allergens.celery')}}</span>
        </v-tooltip>
      </span>
    </span>
    <span v-show="allergens !==undefined && allergens !==null && allergens.almond === true">
      <span>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <i class="flaticon-almond" v-on="on"></i>
          </template>
          <span style="color: #fff;">{{$t('allergens.almond')}}</span>
        </v-tooltip>
      </span>
    </span>
    <span v-show="allergens !==undefined && allergens !==null && allergens.crustaceans === true">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <i class="flaticon-crustaceans" v-on="on"></i>
        </template>
        <span style="color: #fff;">{{$t('allergens.crustaceans')}}</span>
      </v-tooltip>
    </span>
    <span v-show="allergens !==undefined && allergens !==null && allergens.gluten === true">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <i class="flaticon-gluten" v-on="on"></i>
        </template>
        <span style="color: #fff;">{{$t('allergens.gluten')}}</span>
      </v-tooltip>
    </span>
    <span v-show="allergens !==undefined && allergens !==null && allergens.egg === true">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <i class="flaticon-egg" v-on="on"></i>
        </template>
        <span style="color: #fff;">{{$t('allergens.egg')}}</span>
      </v-tooltip>
    </span>
    <span v-show="allergens !==undefined && allergens !==null && allergens.fish === true">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <i class="flaticon-fish" v-on="on"></i>
        </template>
        <span style="color: #fff;">{{$t('allergens.fish')}}</span>
      </v-tooltip>
    </span>
    <span v-show="allergens !==undefined && allergens !==null && allergens.lupin === true">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <i class="flaticon-lupin" v-on="on"></i>
        </template>
        <span style="color: #fff;">{{$t('allergens.lupin')}}</span>
      </v-tooltip>
    </span>
    <span v-show="allergens !==undefined && allergens !==null && allergens.milk === true">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <i class="flaticon-milk" v-on="on"></i>
        </template>
        <span style="color: #fff;">{{$t('allergens.milk')}}</span>
      </v-tooltip>
    </span>
    <span v-show="allergens !==undefined && allergens !==null && allergens.mollusc === true">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <i class="flaticon-mollusc" v-on="on"></i>
        </template>
        <span style="color: #fff;">{{$t('allergens.mollusc')}}</span>
      </v-tooltip>
    </span>
    <span v-show="allergens !==undefined && allergens !==null && allergens.mustard === true">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <i class="flaticon-mustard" v-on="on"></i>
        </template>
        <span style="color: #fff;">{{$t('allergens.mustard')}}</span>
      </v-tooltip>
    </span>
    <span v-show="allergens !==undefined && allergens !==null && allergens.peanuts === true">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <i class="flaticon-peanuts" v-on="on"></i>
        </template>
        <span style="color: #fff;">{{$t('allergens.peanuts')}}</span>
      </v-tooltip>
    </span>
    <span v-show="allergens !==undefined && allergens !==null && allergens.sesame === true">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <i class="flaticon-sesame" v-on="on"></i>
        </template>
        <span style="color: #fff;">{{$t('allergens.sesame')}}</span>
      </v-tooltip>
    </span>
    <span v-show="allergens !==undefined && allergens !==null && allergens.soybean === true">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <i class="flaticon-soybean" v-on="on"></i>
        </template>
        <span style="color: #fff;">{{$t('allergens.soybean')}}</span>
      </v-tooltip>
    </span>
    <span v-show="allergens !==undefined && allergens !==null && allergens.sulfide === true">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <i class="flaticon-sulfide" v-on="on"></i>
        </template>
        <span style="color: #fff;">{{$t('allergens.sulfide')}}</span>
      </v-tooltip>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

interface AllergensData {
  celery?: boolean;
  almond?: boolean;
  crustaceans?: boolean;
  egg?: boolean;
  fish?: boolean;
  lupin?: boolean;
  milk?: boolean;
  mollusc?: boolean;
  mustard?: boolean;
  peanuts?: boolean;
  sesame?: boolean;
  soybean?: boolean;
  sulfide?: boolean;
  gluten?: boolean;
}

@Component
export default class Allergens extends Vue {
  @Prop() allergens!: AllergensData;
}
</script>