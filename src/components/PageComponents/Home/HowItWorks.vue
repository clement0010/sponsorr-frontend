<template>
  <HomeFrameLayout id="organiser" :background="'white'">
    <template #left-content>
      <v-card color="transparent" elevation="0">
        <v-card-title class="text-lg-h3 text-h4 font-weight-bold fix accent1--text">
          Event partnerships
          <br />
          made easy
        </v-card-title>
        <v-spacer />
        <v-card-subtitle class="text-lg-h5">
          Sponsorr! handles the stress of finding suitable partners and sponsors for your event.
          Just publish your event once, then let our propietary matching algorithm look for suitable
          sponsors.
        </v-card-subtitle>
        <v-spacer />
        <v-card-text class="text-lg-h5">
          What else can you do?
        </v-card-text>
        <v-spacer />
        <v-list color="transparent" flat>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="black">
                mdi-clipboard
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-lg-h5 text-wrap">
                Manage multiple events
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="black">
                mdi-clock
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-lg-h5 text-wrap">
                Quickly pitch events
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="black">
                mdi-forum
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-lg-h5 text-wrap">
                Communicate with sponsors
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="black">
                mdi-chart-line-variant
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-lg-h5 text-wrap">
                View event analytics
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="black">
                mdi-update
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-lg-h5 text-wrap">
                Update sponsorship requests on the fly
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </template>
    <template #right-content>
      <v-img
        contain
        width="500"
        src="https://firebasestorage.googleapis.com/v0/b/sponsorr-dev.appspot.com/o/public_assets%2Fimage-howitworks.svg?alt=media&token=b8873f9d-7b5d-4c3e-b1a8-e066557331d3"
      />
    </template>
  </HomeFrameLayout>
</template>

<script lang="ts">
import HomeFrameLayout from '@/layouts/HomeFrameLayout.vue';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  components: {
    HomeFrameLayout,
  },
});
</script>

<style scoped>
.v-card__text,
.v-card__title {
  word-break: normal; /* maybe !important  */
}
</style>
