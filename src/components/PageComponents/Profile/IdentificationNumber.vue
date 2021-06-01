<template>
  <v-card color="transparent" flat width="75%">
    <v-card-text class="black--text text-subtitle-1"> organisation ID: {{ id }} </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'ProfileIdentificationNumber',
  props: {
    id: {
      type: String,
      required: true,
      default: '01',
    },
  },
});
</script>
