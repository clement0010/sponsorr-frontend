<template>
  <v-card color="transparent" flat width="75%">
    <v-card-text class="black--text text-subtitle-1"> organisation ID: {{ id }} </v-card-text>
  </v-card>
</template>

<script lang="ts">
export default {
  props: ['id'],
};
</script>
