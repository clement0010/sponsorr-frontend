<template>
  <v-card class="black--text" color="transparent" flat width="75%">
    <v-card-title class="text-h4">
      About
      <v-btn icon>
        <v-icon color="black">mdi-pencil</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text class="black--text">
      {{ about }}
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
export default {
  props: ['about'],
};
</script>
