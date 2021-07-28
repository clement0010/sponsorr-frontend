<template>
  <HomeFrameLayout id="sponsor">
    <template #left-content>
      <v-img
        contain
        width="500"
        src="https://firebasestorage.googleapis.com/v0/b/sponsorr-dev.appspot.com/o/public_assets%2Fimage-benefits.svg?alt=media&token=6aeca796-9e27-4ffb-94c0-8e2ef2d3ef27"
      />
    </template>
    <template #right-content>
      <v-card color="transparent" elevation="0">
        <v-card-title class="text-lg-h3 text-h4 font-weight-bold fix accent1--text">
          Marketing + CSR
          <br />
          achieved in record time
        </v-card-title>
        <v-spacer />
        <v-card-subtitle class="text-lg-h5 black--text font-weight-bold">
          Use event sponsorships to grow your brand’s recognition.
        </v-card-subtitle>
        <v-card-subtitle class="text-lg-h5">
          Sponsorr! is a platform that matches your business with events that align with your
          brand’s image and values, so you will be able to increase your marketing reach to target
          consumer groups.
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
                Manage multiple sponsorship requests
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
                Retrieve analytic reports
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
                Communicate with event organisers
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="black">
                mdi-magnify
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-lg-h5 text-wrap">
                Search up events in our catalog
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </template>
  </HomeFrameLayout>
</template>

<script lang="ts">
import HomeFrameLayout from '@/layouts/HomeFrameLayout.vue';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Benefits',
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
