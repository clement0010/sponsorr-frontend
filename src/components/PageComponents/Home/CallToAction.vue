<template>
  <HomeFrameLayout :background="'primary'">
    <template #left-content>
      <v-card color="transparent" elevation="0" class="text">
        <v-card-title class="text-lg-h3 text-h4 font-weight-bold fix white--text">
          Ready?
        </v-card-title>
        <v-card-title class="text-lg-h3 text-h4 font-weight-bold fix accent1--text">
          Let's make it happen.
        </v-card-title>

        <v-card-title v-if="!authenticated">
          <AuthenticationButton />
        </v-card-title>
      </v-card>
    </template>
    <template #right-content>
      <v-img contain width="500" src="@/assets/telework-animate.svg" />
    </template>
  </HomeFrameLayout>
</template>

<script lang="ts">
import AuthenticationButton from '@/components/Authentication/AuthenticationButton.vue';
import HomeFrameLayout from '@/layouts/HomeFrameLayout.vue';

import { authenticated } from '@/composable/store';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'CallToAction',
  components: {
    AuthenticationButton,
    HomeFrameLayout,
  },
  setup() {
    return {
      authenticated,
    };
  },
});
</script>

<style scoped>
.content {
  max-width: 1320px;
}

.fix {
  word-break: normal;
}
</style>
