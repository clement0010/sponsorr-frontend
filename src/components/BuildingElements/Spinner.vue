<template>
  <div v-if="loading" class="text-center">
    <v-overlay>
      <v-progress-circular indeterminate size="64" />
    </v-overlay>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Spinner',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
