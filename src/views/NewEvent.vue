<template>
  <BasePage>
    <NewEventLayout
      @loading="$emit('success', 'Creating event...')"
      @redirect="
        (message) => {
          $emit('success', message);
          $router.push({ name: 'Dashboard' });
        }
      "
    />
  </BasePage>
</template>

<script lang="ts">
import BasePage from '@/layouts/BasePage.vue';
import NewEventLayout from '@/layouts/NewEventLayout.vue';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'NewEvent',
  components: {
    BasePage,
    NewEventLayout,
  },
});
</script>
