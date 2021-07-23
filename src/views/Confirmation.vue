<template>
  <BasePage>
    <Spinner v-if="loading" />
    <ConfirmationLayout :error="error" :timeout="timeout" />
  </BasePage>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/composition-api';
import { sendConfirmation } from '@/common';

import BasePage from '@/layouts/BasePage.vue';
import Spinner from '@/components/BuildingElements/Spinner.vue';
import ConfirmationLayout from '@/layouts/ConfirmationLayout.vue';

export default defineComponent({
  name: 'Confirmation',
  components: {
    BasePage,
    ConfirmationLayout,
    Spinner,
  },
  setup(_, { root }) {
    const timeout = ref(5);
    const error = ref(false);
    const loading = ref(false);

    const goToHomePage = (): void => {
      root.$router.push({ name: 'Home' });
    };
    const goToProfilePage = (): void => {
      const { id } = root.$route.query;
      root.$router.push({ name: 'Profile', params: { id: id.toString() } });
    };

    const countDownTimer = (): void => {
      if (timeout.value > 0) {
        setTimeout(() => {
          timeout.value -= 1;
          countDownTimer();
        }, 1000);
        return;
      }
      if (error.value) {
        goToHomePage();
        return;
      }
      goToProfilePage();
    };

    onMounted(async () => {
      loading.value = true;
      const { emailAddress, id, hash } = root.$route.query;
      if (!emailAddress || !id || !hash) {
        goToHomePage();
      }
      try {
        const statusCode = await sendConfirmation(
          emailAddress.toString(),
          id.toString(),
          hash.toString(),
        );
        if (statusCode !== 200) {
          throw new Error('Verfication failed');
        }
      } catch (err) {
        console.error(err);
        error.value = true;
      } finally {
        loading.value = false;
        countDownTimer();
      }
    });

    return {
      loading,
      error,
      timeout,
    };
  },
});
</script>
