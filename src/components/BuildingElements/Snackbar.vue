<template>
  <v-snackbar :color="status" :value="activate">
    <v-row justify="center">
      {{ message }}
    </v-row>
  </v-snackbar>
</template>

<script lang="ts">
import useSnackbar from '@/composable/snackbarComposition';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Snackbar',
  setup() {
    const { activate, message, status } = useSnackbar();

    return {
      activate,
      message,
      status,
    };
  },
});
</script>
