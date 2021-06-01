<template>
  <BasePage>
    <DashboardLayout />
  </BasePage>
</template>

<script lang="ts">
import BasePage from '@/layouts/BasePage.vue';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Dashboard',
  components: {
    BasePage,
    DashboardLayout,
  },
});
</script>
