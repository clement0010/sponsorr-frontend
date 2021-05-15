<template>
  <v-card class="black--text" color="transparent" flat width="75%">
    <v-card-title>
      {{ name }}
    </v-card-title>
  </v-card>
</template>

<script lang="ts">
export default {
  props: ['name'],
};
</script>
