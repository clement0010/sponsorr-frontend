<template>
  <v-container fluid class="primary pa-0 pb-15">
    <NavigationBarWeb v-if="$vuetify.breakpoint.mdAndUp" />
    <NavigationBarMobile v-else />
    <slot />
    <Footer />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import NavigationBarWeb from '@/components/Navigations/NavigationBarWeb.vue';
import Footer from '@/components/PageComponents/Footer.vue';
import NavigationBarMobile from '@/components/Navigations/NavigationBarMobile.vue';

export default defineComponent({
  name: 'BasePage',
  components: {
    NavigationBarWeb,
    Footer,
    NavigationBarMobile,
  },
});
</script>
