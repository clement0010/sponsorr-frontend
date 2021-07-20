<template>
  <v-card color="transparent" flat>
    <v-card-title class="black--text text-md-h3 text-sm-h4 text-center text-sm-left">
      {{ name }}
    </v-card-title>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'ProfileName',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.v-card__title {
  word-break: normal;
}
</style>
