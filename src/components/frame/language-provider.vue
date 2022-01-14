<template>
  <v-menu
    offset-y
    origin="right top"
    left
    content-class="language-dropdown"
    transition="slide-y-transition"
    nudge-top="-10"
    class="v-step-3"
  >
    <template v-slot:activator="{ on }">
      <v-btn icon large v-on="on">
        <img class="img-responsive" :src="`/flag-icons/${$store.state.i18n.locale.icon}.png`" />
      </v-btn>
    </template>
    <div class="dropdown-content">
      <div class="dropdown-top d-custom-flex justify-space-between primary">
        <span class="white--text fw-bold">{{$t("head.languages")}}</span>
      </div>
      <v-list class="dropdown-list">
        <v-list-item
          v-for="language in $store.state.i18n.locales"
          :key="language.name"
          @click="changeLanguage(language)"
        >
          <img class="img-responsive mr-3" :src="`/flag-icons/${language.icon}.png`" />
          <span>{{ language.name }}</span>
        </v-list-item>
      </v-list>
    </div>
  </v-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { RouteConfig, RouteRecord } from "vue-router";

@Component({})
export default class LanguageProvider extends Vue {
  changeLanguage(language) {
    this.$i18n.locale = language.locale;
    this.$store.dispatch("i18n/storeLanguage", language);
    if (this.$router.currentRoute.params.lang === undefined)
      this.$router.push({
        path: `/${language.locale}${this.$router.currentRoute.fullPath}`
      });
    else {
      this.$router.push({
        path: this.$router.currentRoute.fullPath.replace(
          this.$router.currentRoute.params.lang,
          language.locale
        )
      });
    }
  }
}
</script>

<style lang="scss">
.quciklink-dropdown,
.notification-dropdown,
.language-dropdown {
  background-color: #fafafa;
  .dropdown-content {
    width: 321px;
    .dropdown-top {
      padding: 1rem 1.25rem;
    }
    .dropdown-list {
      background: transparent !important;
      > div {
        display: inline-block;
        width: 46.5%;
        box-shadow: 0 3px 2px 0 rgba(0, 0, 0, 0.02);
        margin: 0.3125rem;
        .v-list__tile {
          background-color: #ffffff;
          span {
            font-size: 0.875rem;
            transition: color 0.3s ease;
          }
          &:hover {
            span {
              color: #5d92f4 !important;
            }
            background-color: #ffffff !important;
          }
        }
      }
    }
  }
}
</style>