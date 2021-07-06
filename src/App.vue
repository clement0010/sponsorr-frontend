<template>
  <v-app>
    <v-main class="primary">
      <router-view />
      <Snackbar />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Snackbar from '@/components/BuildingElements/Snackbar.vue';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'App',
  components: {
    Snackbar,
  },
});
</script>

<style>
a {
  text-decoration: none;
}
</style>
