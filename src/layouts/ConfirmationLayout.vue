<template>
  <HomeFrameLayout class="background">
    <template #left-content>
      <v-card-title class="white--text text-lg-h2 text-h3 fix font-weight-bold">
        Welcome to Sponsorr!
      </v-card-title>
      <v-card-title class="white--text text-h5 fix">
        Your email has been verified.
        <v-icon color="white" class="mx-2">
          mdi-check-decagram
        </v-icon>
      </v-card-title>
    </template>
    <template #right-content>
      <v-img src="@/assets/celebration-animate.svg" contain />
    </template>
  </HomeFrameLayout>
</template>

<script lang="ts">
import HomeFrameLayout from '@/layouts/HomeFrameLayout.vue';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'ConfirmationLayout',
  components: {
    HomeFrameLayout,
  },
});
</script>

<style scoped>
.background {
  background-image: linear-gradient(to left top, #ff9131, #e7554e, #b32b62, #6d1e65, #1b1852);
  height: 100vh;
}
</style>
