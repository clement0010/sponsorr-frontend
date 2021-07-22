<template>
  <v-footer padless absolute>
    <v-container fill-height>
      <v-row align="center" justify="center">
        <v-col cols="auto" order="first">
          NUS Orbital 2021
        </v-col>
        <v-spacer />
        <v-col cols="auto" order="second"> &copy; {{ new Date().getFullYear() }} Sponsorr! </v-col>
        <v-spacer v-if="$vuetify.breakpoint.lgAndUp" />
        <v-col v-if="$route.name === 'Home'" cols="auto" order="third">
          Illustrations by
          <a href="https://storyset.com/">
            Storyset
          </a>
        </v-col>
        <v-spacer v-if="$route.name === 'Home'" />
        <v-col cols="auto">
          <v-btn class="mx-4" icon>
            <v-icon size="30px" color="black">
              mdi-github
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Footer',
});
</script>

<style scoped>
.container {
  max-width: 1320px;
}
</style>
