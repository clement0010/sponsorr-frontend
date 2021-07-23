<template>
  <v-container fluid class="primary pa-0 pb-15">
    <transition name="fade"> <VerificationModal v-if="authenticated" /> </transition>
    <slot />
  </v-container>
</template>

<script lang="ts">
import VerificationModal from '@/components/Verification/VerificationModal.vue';
import { authenticated } from '@/composable/store';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'BasePage',
  components: {
    VerificationModal,
  },
  setup() {
    return {
      authenticated,
    };
  },
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
