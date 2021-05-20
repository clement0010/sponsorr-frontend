<template>
  <BasePage>
    <ProfileLayout />
  </BasePage>
</template>

<script lang="ts">
import BasePage from '@/layouts/BasePage.vue';
import ProfileLayout from '@/layouts/ProfileLayout.vue';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Profile',
  components: {
    BasePage,
    ProfileLayout,
  },
});
</script>
