<template>
  <v-container fluid fill-height>
    <v-layout>
      <v-flex md12>
        <v-card>
          <v-card-title>{{$t('editProfile.title')}}</v-card-title>
          <v-container grid-list-xl>
            <v-layout wrap>
              <ListItem></ListItem>
              <ListItem></ListItem>
              <ListItem></ListItem>
              <ListItem></ListItem>
              <ListItem></ListItem>
              <ListItem></ListItem>
              <ListItem></ListItem>
              <ListItem></ListItem>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";
import ListItem from "@/components/list-item.vue";

@Component({
  components: {
    ListItem
  }
})
export default class ResturantList extends Vue {
  wqresturantdetail_function() {
    this.$router.push({ name: "ResturantDetail" });
  }
}
</script>

<style>
</style>