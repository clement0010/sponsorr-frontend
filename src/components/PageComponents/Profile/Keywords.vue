<template>
  <v-card color="transparent" flat width="75%">
    <v-card-title class="text-h4 black--text">
      Keywords
      <v-btn icon class="mx-5">
        <v-icon color="black">
          mdi-pencil
        </v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-chip class="mx-1" v-for="keyword in keywords" :key="keyword">
        {{ keyword }}
      </v-chip>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
export default {
  props: ['keywords'],
};
</script>
