<template>
  <v-container fluid class="primary pa-0 pb-15">
    <VerificationModal />
    <slot />
  </v-container>
</template>

<script lang="ts">
import VerificationModal from '@/components/Verification/VerificationModal.vue';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'BasePage',
  components: {
    VerificationModal,
  },
});
</script>
