<template>
  <v-snackbar
    v-model="snackbar"
    timeout="2000"
    :color="status"
  >
    {{ message }}
  </v-snackbar>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'Snackbar',
  props: {
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['error', 'success'],
    },
  },
  setup() {
    const snackbar = ref(true);
    return { snackbar };
  },
});
</script>
