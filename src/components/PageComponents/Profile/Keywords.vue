<template>
  <v-card class="black--text" color="transparent" flat width="75%">
    <v-card-title class="text-h4">
      Keywords
      <v-btn icon>
        <v-icon color="black">
          mdi-pencil
        </v-icon>
      </v-btn>
    </v-card-title>
    <v-chip v-for="keyword in keywords" :key="keyword">
      {{ keyword }}
    </v-chip>
  </v-card>
</template>

<script lang="ts">
export default {
  props: ['keywords'],
};
</script>
