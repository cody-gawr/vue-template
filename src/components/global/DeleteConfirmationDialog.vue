<template>
  <v-dialog v-model="open" max-width="500">
    <v-card>
      <v-card-title class="headline">{{ heading }}</v-card-title>
      <v-card-text>{{message}}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="open = false">Cancel</v-btn>
        <v-btn color="error" @click="$emit('onConfirm')">Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide } from "vue-property-decorator";

@Component
export default class DeleteConfirmationDialog extends Vue {
  @Prop() heading!: any;
  @Prop() message!: any;
  @Prop() onConfirm!: any;
  open = false;
  openDialog() {
    this.open = true;
  }
  close() {
    this.open = false;
  }
}
</script>