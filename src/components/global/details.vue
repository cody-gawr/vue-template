<template>
  <div>
    <v-layout row wrap v-for="(item, i) in details" :key="i">
      <v-flex>
        <v-card v-if="item.type.includes('i18n')">
          <v-card-title>{{$t(item.i18nTitle)}}</v-card-title>
          <v-expansion-panels accordion v-if="item.type.includes('exp')">
            <v-expansion-panel v-for="(subitem, i) in item.content" :key="i">
              <v-expansion-panel-header class="accordion-title">
                <span>{{subitem.i18nTitle}}</span>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <span>{{subitem.i18nContent}}</span>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-list style="padding-top:0" v-if="item.type.includes('tab')">
            <v-list-item v-for="(subitem, i) in item.content" :key="i">
              <v-list-item-content>
                <span>{{$t(subitem.i18nTitle)}}</span>
              </v-list-item-content>
              <span>{{subitem.i18nContent}} {{subitem.unit}}</span>
            </v-list-item>
          </v-list>
          <no-ssr>
            <apexcharts
              v-if="item.type.includes('tab') && item.type.includes('graph')"
              type="radar"
              :options="chartNFI18nOptions(item.content)"
              :series="chartNFI18nSeries(item.content)"
            ></apexcharts>
          </no-ssr>
        </v-card>
        <v-card v-else>
          <v-card-title>{{item.title[0].value}}</v-card-title>
          <v-expansion-panels accordion v-if="item.type.includes('exp')">
            <v-expansion-panel v-for="(subitem, i) in item.content" :key="i">
              <v-expansion-panel-header class="accordion-title">
                <span>{{subitem.title[0].value}}</span>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <span>{{subitem.content[0].value}}</span>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-list style="padding-top:0" v-if="item.type.includes('tab')">
            <v-list-item v-for="(subitem, i) in item.content" :key="i">
              <v-list-item-content>
                <span>{{$t(subitem.title[0].value)}}</span>
              </v-list-item-content>
              <span>{{subitem.content[0].value}} {{subitem.unit}}</span>
            </v-list-item>
          </v-list>
          <no-ssr>
            <apexcharts
              v-if="item.type.includes('tab') && item.type.includes('graph')"
              type="radar"
              :options="chartNFI18nOptions(item.content)"
              :series="chartNFI18nSeries(item.content)"
            ></apexcharts>
          </no-ssr>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Details extends Vue {
  @Prop() details!: any;

  chartNFI18nOptions(data: any[]) {
    return {
      dataLabels: {
        enabled: true,
        enabledOnSeries: undefined,
        formatter: function(val, opts) {
          return val;
        },
        textAnchor: "middle",
        offsetX: 0,
        offsetY: 0,
        style: {
          fontSize: "15px",
          fontFamily: "PT Sans",
          colors: ["#514d6a"]
        },
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          opacity: 0.45
        }
      },
      plotOptions: {
        radar: {
          size: 86
        }
      },
      colors: ["#ce1f28"],
      chart: {
        toolbar: {
          show: false
        }
      },
      xaxis: {
        categories: data
          .filter(o => o.chart > -1)
          .sort((a, b) => a.chart - b.chart)
          .map(o => this.$t(o.i18nTitle))
      }
    };
  }
  chartNFI18nSeries(data: any[]) {
    return [
      {
        name: "nut-facts",
        data: data
          .filter(o => o.chart > -1)
          .sort((a, b) => a.chart - b.chart)
          .map(o => o.i18nContent)
      }
    ];
  }
}
</script>