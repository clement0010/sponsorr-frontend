<template>
  <BasePage>
    <MatchesLayout />
  </BasePage>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import BasePage from '@/layouts/BasePage.vue';
import MatchesLayout from '@/layouts/MatchesLayout.vue';

export default defineComponent({
  name: 'Matches',
  components: {
    BasePage,
    MatchesLayout,
  },
});
</script>
