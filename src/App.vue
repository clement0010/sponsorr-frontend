<template>
  <v-app>
    <v-main class="primary">
      <router-view @alert="alert" @success="success" />
      <Snackbar :activate="snackbarActivate" :message="snackbarMessage" :status="snackbarStatus" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import Snackbar from './components/BuildingElements/Snackbar.vue';

export default defineComponent({
  name: 'App',
  components: {
    Snackbar,
  },
  setup() {
    const snackbarActivate = ref(false);
    const snackbarMessage = ref('');
    const snackbarStatus = ref('');

    const snackbarShow = () => {
      snackbarActivate.value = true;
      setTimeout(() => {
        snackbarActivate.value = false;
      }, 2000);
    };

    const alert = (message: string): void => {
      snackbarMessage.value = message;
      snackbarStatus.value = 'error';
      snackbarShow();
    };

    const success = (message: string): void => {
      snackbarMessage.value = message;
      snackbarStatus.value = 'success';
      snackbarShow();
    };

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
