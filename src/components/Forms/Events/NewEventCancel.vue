<template>
  <v-btn text class="warning" @click="cancel"> Cancel </v-btn>
</template>

<script lang="ts">
import useSnackbar from '@/composable/snackbarComposition';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'NewEventCancelButton',
  setup(_, { root }) {
    const { success } = useSnackbar();
    const cancel = () => {
      localStorage.removeItem('data');
      root.$router.push({ name: 'Dashboard' });
      success('Event creation canceled');
    };

    return { cancel };
  },
});
</script>
