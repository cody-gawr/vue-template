<template>
  <v-container fluid fill-height>
    <v-layout>
      <v-flex md12>
        <nuxt-link
          style="text-decoration:none"
          :to="{ name: 'restaurant', params: { lang: $router.currentRoute.params.lang, id: restaurant.key}}"
        >
          <h1>{{restaurant.name[0].value}}</h1>
        </nuxt-link>
        <v-tabs v-model="tab" background-color="white" class="elevation-1">
          <v-tab
            v-for="(menu,i) in restaurant.menus"
            :key="i"
            :href="`#tab-${i}`"
          >{{menu.title[0].value}}</v-tab>
          <v-tab-item v-for="(menu,i) in restaurant.menus" :key="i" :value="'tab-' + i">
            <v-card class="elevation-0" v-for="(section,i) in menu.sections" :key="i">
              <v-card-title>{{section.sectionName[0].value}}</v-card-title>
              <v-container grid-list-xl>
                <v-layout wrap>
                  <MenuListItem v-for="(dish,i) in section.dishes" :key="i" :dish="dish"></MenuListItem>
                </v-layout>
              </v-container>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";
import { getMenu } from "@/apis/datastore/restaurant";
import MenuListItem from "@/components/data/menu-list-item.vue";

@Component({
  async asyncData(context) {
    const { data } = await getMenu(
      context.route.params.lang || "en",
      context.route.params.id
    );
    return { restaurant: data };
  },
  components: {
    MenuListItem
  }
})
export default class Menu extends Vue {
  tab: string = "tab-0";
}
</script>

<style>
</style>