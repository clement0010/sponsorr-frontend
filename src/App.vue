<template>
  <v-app>
    <NavigationBarWeb
      v-if="$vuetify.breakpoint.mdAndUp && $route.name !== 'SignUp' && $route.name !== 'Login'"
    />
    <NavigationBarMobile v-else-if="$route.name !== 'SignUp' && $route.name !== 'Login'" />
    <NavigationSideBar v-if="$vuetify.breakpoint.mdAndUp && authenticated && !authLoading" />
    <v-main class="primary">
      <router-view :key="$route.fullPath" />
      <Snackbar />
    </v-main>
    <Footer v-if="$route.name !== 'SignUp' && $route.name !== 'Login'" />
  </v-app>
</template>

<script lang="ts">
import Footer from '@/components/PageComponents/Footer.vue';
import NavigationBarMobile from '@/components/Navigations/NavigationBarMobile.vue';
import NavigationBarWeb from '@/components/Navigations/NavigationBarWeb.vue';
import NavigationSideBar from '@/components/Navigations/NavigationSideBar.vue';
import Snackbar from '@/components/BuildingElements/Snackbar.vue';

import { authenticated, authLoading } from '@/composable/store';
import { computed, defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'App',
  components: {
    Footer,
    NavigationSideBar,
    NavigationBarWeb,
    NavigationBarMobile,
    Snackbar,
  },
  setup() {
    return {
      authenticated: computed(() => authenticated.value),
      authLoading: computed(() => authLoading.value),
    };
  },
});
</script>

<style>
a {
  text-decoration: none;
}
</style>
