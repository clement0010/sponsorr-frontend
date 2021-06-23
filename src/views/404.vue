<template>
  <BasePage>
    <v-container fluid class="ma-0 pa-0">
      <v-img src="@/assets/image-404.jpeg" height="100vh">
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
