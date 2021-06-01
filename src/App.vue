<template>
  <v-app>
    <v-main class="primary">
      <router-view @alert="alert" @success="success" />
      <Snackbar :activate="snackbarActivate" :message="snackbarMessage" :status="snackbarStatus" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import useSnackbar from '@/composable/snackbarComposition';

import Snackbar from './components/BuildingElements/Snackbar.vue';

export default defineComponent({
  name: 'App',
  components: {
    Snackbar,
  },
  setup() {
    const { alert, success, snackbarActivate, snackbarMessage, snackbarStatus } = useSnackbar();

    return {
      alert,
      success,

      snackbarActivate,
      snackbarMessage,
      snackbarStatus,
    };
  },
});
</script>

<style>
a {
  text-decoration: none;
}
</style>
