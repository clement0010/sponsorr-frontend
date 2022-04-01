<template>
  <v-app>
    <transition name="fade">
      <NavigationBarWeb
        v-if="$vuetify.breakpoint.mdAndUp && $route.name !== 'SignUp' && $route.name !== 'Login'"
      />
      <NavigationBarMobile v-else-if="$route.name !== 'SignUp' && $route.name !== 'Login'" />
    </transition>
    <transition name="fade">
      <NavigationSideBar v-if="$vuetify.breakpoint.mdAndUp && displayCondition" />
    </transition>
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

import { authenticated, authLoading, emailVerified } from '@/composable/store';
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
  setup(_, { root }) {
    const displayCondition = computed(() => {
      if (authLoading.value) return false;

      if (!authenticated.value) return false;

      return root.$route.name !== 'Confirmation';
    });

    return {
      authenticated: computed(() => authenticated.value),
      authLoading: computed(() => authLoading.value),
      emailVerified: computed(() => !emailVerified.value),
      displayCondition,
    };
  },
});
</script>

<style>
a {
  text-decoration: none;
}
</style>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
