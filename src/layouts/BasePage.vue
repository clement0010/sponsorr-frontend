<template>
  <v-container fluid class="primary pa-0 pb-15">
    <transition name="fade"> <VerificationModal v-if="displayCondition" /> </transition>
    <slot />
  </v-container>
</template>

<script lang="ts">
import VerificationModal from '@/components/Verification/VerificationModal.vue';
import { authenticated, emailVerified } from '@/composable/store';

import { computed, defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'BasePage',
  components: {
    VerificationModal,
  },
  setup(_, { root }) {
    const deactivatedRoutes = computed(
      () =>
        root.$route.name === 'SignUp' ||
        root.$route.name === 'Login' ||
        root.$route.name === 'Confirmation',
    );
    const displayCondition = computed(() => {
      if (deactivatedRoutes.value) return false;

      return authenticated.value && !emailVerified.value;
    });

    return {
      displayCondition,
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
