<template>
  <v-card-text class="black--text text-body-1">
    {{ about }}
  </v-card-text>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    about: {
      type: String,
      required: true,
    },
  },
});
</script>
