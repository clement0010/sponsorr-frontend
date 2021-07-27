<template>
  <HomeFrameLayout class="background">
    <template #left-content>
      <v-card-title class="white--text text-lg-h2 text-h3 fix font-weight-bold">
        Welcome to Sponsorr!
      </v-card-title>
      <v-card-title v-if="!error" class="white--text text-h5 fix">
        Uh No! Something went wrong! You will be redirected to Home Page in {{ timeout }}
        {{ timeout > 1 ? 'seconds' : 'second' }}!
      </v-card-title>
      <v-card-title v-else class="white--text text-h5 fix">
        Your email has been verified.
        <v-icon color="white" class="mx-2">
          mdi-check-decagram
        </v-icon>
        You will be redirected to Profile Page in {{ timeout }}
        {{ timeout > 1 ? 'seconds' : 'second' }}!
      </v-card-title>
    </template>
    <template v-if="!error" #right-content>
      <v-img
        src="https://firebasestorage.googleapis.com/v0/b/sponsorr-dev.appspot.com/o/public_assets%2Fimage-verify-failed.svg?alt=media&token=a5119a4b-8ca9-413f-9c7c-0bd0f932adaa"
        contain
      />
    </template>
    <template v-else #right-content>
      <v-img
        src="https://firebasestorage.googleapis.com/v0/b/sponsorr-dev.appspot.com/o/public_assets%2Fimage-verify-success.svg?alt=media&token=0aea74f8-a74b-4c20-8f3d-810c1b8af2b0"
        contain
      />
    </template>
  </HomeFrameLayout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import HomeFrameLayout from '@/layouts/HomeFrameLayout.vue';

export default defineComponent({
  name: 'ConfirmationLayout',
  components: {
    HomeFrameLayout,
  },
  props: {
    error: {
      type: Boolean,
    },
    timeout: {
      type: Number,
      default: 5,
    },
  },
});
</script>

<style scoped>
.background {
  background-image: linear-gradient(to left top, #ff9131, #e7554e, #b32b62, #6d1e65, #1b1852);
  height: 100vh;
}
</style>
