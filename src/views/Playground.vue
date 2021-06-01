<template>
  <BasePage>
    <Snackbar :value="snackbar" :message="message" :status="status" />
  </BasePage>
</template>

<script lang="ts">
import BasePage from '@/layouts/BasePage.vue';
import Snackbar from '@/components/BuildingElements/Snackbar.vue';

import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'Playground',
  components: {
    BasePage,
    Snackbar,
  },
  setup() {
    const message = ref('Big boo');
    const status = ref('');
    const snackbar = ref(false);
    status.value = 'error';
    return { message, status, snackbar };
  },
});
</script>
