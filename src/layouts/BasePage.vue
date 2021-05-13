<template>
  <v-container fluid class="pa-0">
    <slot name="navigation"></slot>
    <slot></slot>
    <Footer />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import NavigationBarWeb from '@/components/Navigations/NavigationBarWeb.vue';
import Footer from '@/components/PageComponents/Footer.vue';

export default defineComponent({
  components: {
    NavigationBarWeb,
    Footer,
  },
});
</script>
