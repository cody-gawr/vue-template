<template>
  <v-card min-height="340">
    <v-card-title>{{ typeof data.titleI18n ==='string' && data.titleI18n !=='' ? $t(data.titleI18n) :data.title[0].value}}</v-card-title>
    <v-card-text>
      <p v-for="(item, i) in data.contents" :key="i">
        <span v-if="item.type === 'map'">
          <a @click="mapsSelector(item.data.lat, item.data.lon)">
            <img style="width: 100%; height: auto;margin-top:0.5rem" :src="item.src" alt />
          </a>
        </span>
        <span v-if="item.type === 'address'">
          <v-icon>mdi-map-marker</v-icon>
          <a @click="mapsSelector(item.data.lat, item.data.lon)">{{item.content[0].value}}</a>
        </span>
        <span v-if="item.type === 'tel'">
          <v-icon>mdi-phone</v-icon>
          <a :href="`tel:${item.contentI18n}`">{{item.contentI18n}}</a>
        </span>
        <span v-if="item.type === 'mail'">
          <v-icon>mdi-at</v-icon>
          <a :href="`mailto:${item.contentI18n}`">{{item.contentI18n}}</a>
        </span>
        <span v-if="item.type === 'web'">
          <v-icon>mdi-laptop</v-icon>
          <a :href="item.contentI18n" target="_blank">{{$t('restaurantDetail.website')}}</a>
        </span>
        <span v-if="item.type === 'img'">
          <a v-if="typeof item.href ==='string' && item.href !==''" :href="item.url">
            <img style="width: 100%; height: auto;margin-top:0.5rem" :src="item.src" alt />
          </a>
          <img v-else style="width: 100%; height: auto;margin-top:0.5rem" :src="item.src" alt />
        </span>
        <span v-if="item.type === 'link'">
          <v-icon v-if="typeof item.icon ==='string' && item.icon !==''">{{item.icon}}</v-icon>
          <a
            :href="item.url"
            target="_blank"
          >{{ typeof item.contentI18n ==='string' && item.contentI18n !=='' ? $t(item.contentI18n) : item.content[0].value}}</a>
        </span>
        <span v-if="item.type === 'text'">
          <v-icon v-if="typeof item.icon ==='string' && item.icon !==''">{{item.icon}}</v-icon>
          <span>{{ typeof item.contentI18n ==='string' && item.contentI18n !=='' ? $t(item.contentI18n) : item.content[0].value}}</span>
        </span>
      </p>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Action } from "vuex-class";

@Component
export default class ContentBottom extends Vue {
  @Prop() data!: any;
  mapsSelector(lat: number, lon: number) {
    if (
      /* if we're on iOS, open in Apple Maps */
      navigator.platform.indexOf("iPhone") != -1 ||
      navigator.platform.indexOf("iPad") != -1 ||
      navigator.platform.indexOf("iPod") != -1
    )
      window.open(`maps://maps.google.com/maps?daddr=${lat},${lon}&amp;ll=`);
    /* else use Google */ else
      window.open(`https://maps.google.com/maps?daddr=${lat},${lon}&amp;ll=`);
  }
}
</script>