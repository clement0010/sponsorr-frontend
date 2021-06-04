<template>
  <BasePage>
    <EventDelete />
  </BasePage>
</template>

<script lang="ts">
import BasePage from '@/layouts/BasePage.vue';
import EventDelete from '@/components/UserActions/EventDelete.vue';
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'Playground',
  components: {
    BasePage,
    EventDelete,
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
