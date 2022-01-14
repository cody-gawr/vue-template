<template>
	<div class="loader-overlay" v-if="status">
  		<v-progress-circular indeterminate color="primary"></v-progress-circular>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide } from "vue-property-decorator";

@Component
export default class AppSectionLoader extends Vue {
  @Prop() status!: boolean;
}
</script>