<template>
  <HomeFrameLayout :background="'primary'">
    <template #left-content>
      <v-card color="transparent" elevation="0">
        <v-card-title class="text-lg-h3 text-h4 font-weight-bold fix white--text">
          We make event
          <br />
          partnerships happen
        </v-card-title>
        <v-spacer />
        <v-card-subtitle class="text-body-1 text-lg-h5 white--text">
          Sponsorr! uses machine learning to help event organisers source for partners, so you can
          focus on planning the next big thing on your event itenerary.
        </v-card-subtitle>
        <v-spacer />
        <v-card-subtitle v-scroll-animation class="justify-center">
          <v-btn
            text
            class="accent1 white--text mr-4 my-1"
            :class="{ mobile: $vuetify.breakpoint.smAndDown }"
            @click="$vuetify.goTo('#organiser')"
          >
            For Event Organisers
          </v-btn>
          <v-btn
            text
            class="accent2 white--text my-1"
            :class="{ mobile: $vuetify.breakpoint.smAndDown }"
            @click="$vuetify.goTo('#sponsor')"
          >
            For Sponsors
          </v-btn>
        </v-card-subtitle>
      </v-card>
    </template>
    <template #right-content>
      <v-img contain width="500" src="@/assets/international-youth-day-animate.svg" />
    </template>
  </HomeFrameLayout>
</template>

<script lang="ts">
import HomeFrameLayout from '@/layouts/HomeFrameLayout.vue';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Introduction',
  components: {
    HomeFrameLayout,
  },
});
</script>

<style scoped>
.before-enter {
  opacity: 0;
  transform: translateY(100px);
  transition: all 2s ease-out;
}

.enter {
  opacity: 1;
  transform: translateX(0px);
}

.v-card__text,
.v-card__title {
  word-break: normal; /* maybe !important  */
}

.mobile {
  width: 100%;
}
</style>
