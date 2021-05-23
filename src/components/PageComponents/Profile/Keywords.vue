<template>
    <v-card-text>
      <v-chip-group column>
        <v-chip v-for="keyword in keywords" :key="keyword" disabled>
          {{ keyword }}
        </v-chip>
      </v-chip-group>
    </v-card-text>
</template>

<script lang="ts">
import { PropType } from 'vue';

export default {
  props: {
    keywords: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
};
</script>
