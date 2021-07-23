<template>
  <BasePage>
    <ConfirmationLayout />
  </BasePage>
</template>

<script lang="ts">
import BasePage from '@/layouts/BasePage.vue';
import ConfirmationLayout from '@/layouts/ConfirmationLayout.vue';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Confirmation',
  components: {
    BasePage,
    ConfirmationLayout,
  },
});
</script>
