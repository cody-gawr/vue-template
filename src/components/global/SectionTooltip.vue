<template>
	<div class="dash-title">
		<span>{{title}}</span>
		<v-tooltip v-model="open" top>
			<a href="javascript:void(0);" slot="activator">
				<v-icon>ti-help-alt</v-icon>
			</a>
			<span>{{tooltip}}</span>
		</v-tooltip>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide } from "vue-property-decorator";

@Component
export default class SectionTooltip extends Vue {
  @Prop() title!: any;
  @Prop() tooltip!: any;
  open = false;
}
</script>