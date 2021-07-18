<template>
  <v-container fluid class="ma-0 pa-0">
    <v-img src="@/assets/image-404.jpeg" height="100vh">
      <v-row align="center" justify="center">
        <v-col>
          <v-card flat color="transparent">
            <v-card-title class="justify-center text-h1 white--text">
              EVENT NOT FOUND
            </v-card-title>
            <v-card-title class="justify-center text-h4 white--text">
              Look somewhere else!
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-img>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'EventNotFoundLayout',
});
</script>
