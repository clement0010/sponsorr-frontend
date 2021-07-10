<template>
  <BasePage>
    <SettingsLayout />
  </BasePage>
</template>

<script lang="ts">
import BasePage from '@/layouts/BasePage.vue';
import SettingsLayout from '@/layouts/SettingsLayout.vue';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Settings',
  components: {
    BasePage,
    SettingsLayout,
  },
});
</script>
