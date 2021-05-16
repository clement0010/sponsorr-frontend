<template>
  <v-card color="transparent" flat>
    <v-card-title class="black--text text-h3">
      {{ name }}
    </v-card-title>
  </v-card>
</template>

<script lang="ts">
export default {
  props: ['name'],
};
</script>

<style scoped>
.v-card__title {
  word-break: normal;
}
</style>
