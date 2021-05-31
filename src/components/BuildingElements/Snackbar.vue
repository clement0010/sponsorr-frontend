<template>
  <v-snackbar
    :color="status"
    :value="activate"
  >
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
    },
    status: {
      type: String,
      enum: ['error', 'success'],
    },
    activate: {
      type: Boolean,
    },
  },
});
</script>
