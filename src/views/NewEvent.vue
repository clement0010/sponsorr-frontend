<template>
  <BasePage>
    <NewEventLayout />
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
