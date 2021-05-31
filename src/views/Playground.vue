<template>
  <BasePage>
    <Snackbar
      :message="'HowdyHoo'"
      :status="'error'"
    />
  </BasePage>
</template>

<script lang="ts">
import BasePage from '@/layouts/BasePage.vue';
import Snackbar from '@/components/BuildingElements/Snackbar.vue';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Playground',
  components: {
    BasePage,
    Snackbar,
  },
});
</script>
