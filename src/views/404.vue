<template>
  <v-container fill-height style="height: calc(100vh - 58px);">
    <v-layout align-center>
      <v-flex text-center>
        <h1 class="display-2 primary--text">Whoops, 404</h1>
        <p>The page you were looking for does not exist</p>
        <v-btn :to="`/`" outlined color="primary">Get me out of here!</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";

@Component
export default class NotFound extends Vue {}
</script>
