<template>
  <v-snackbar :color="status" :value="activate">
    {{ message }}
  </v-snackbar>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Snackbar',
  props: {
    message: {
      type: String,
      default: 'Default',
    },
    status: {
      type: String,
      enum: ['error', 'success'],
      default: 'success',
    },
    activate: {
      type: Boolean,
    },
  },
});
</script>
