<template>
  <v-app>
    <div class="default">
      <Head></Head>
      <Navigation></Navigation>
      <v-content>
        <Nuxt />
      </v-content>
    </div>
  </v-app>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Getter } from "vuex-class";
import Head from "@/components/frame/head.vue";
import Navigation from "@/components/frame/navigation.vue";

@Component({
  components: {
    Head,
    Navigation
  }
})
export default class MainLayout extends Vue {}
</script>

<style>
.default {
  font-family: "PT Sans", sans-serif;
}
</style>
