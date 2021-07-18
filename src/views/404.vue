<template>
  <BasePage>
    <v-container fluid class="ma-0 pa-0">
      <v-img
        src="https://firebasestorage.googleapis.com/v0/b/sponsorr-dev.appspot.com/o/public_assets%2Fimage-404.jpeg?alt=media&token=72a658a0-39ed-4493-a775-525806728b17"
        height="100vh"
      >
        <v-row align="center" justify="center">
          <v-col>
            <v-card flat color="transparent">
              <v-card-title class="justify-center text-h1 white--text">
                ERROR 404
              </v-card-title>
              <v-card-title class="justify-center text-h4 white--text">
                Look somewhere else!
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-img>
    </v-container>
  </BasePage>
</template>

<script lang="ts">
import BasePage from '@/layouts/BasePage.vue';

export default {
  components: {
    BasePage,
  },
};
</script>
