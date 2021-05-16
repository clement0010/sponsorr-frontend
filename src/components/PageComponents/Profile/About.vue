<template>
  <v-card color="transparent" flat width="75%">
    <v-card-title class="black--text text-h4">
      About
      <v-btn icon class="mx-5">
        <v-icon color="black">
          mdi-pencil
        </v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text class="black--text text-body-1">
      {{ about }}
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
export default {
  props: {
    about: String,
  },
};
</script>
