<template>
  <v-card color="transparent" flat>
    <v-card-title class="black--text text-h3">
      {{ name }}
    </v-card-title>
  </v-card>
</template>

<script lang="ts">
import useProfile from '@/composable/profileComposition';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'ProfileName',
  setup() {
    const { name } = useProfile();

    return {
      name,
    };
  },
});
</script>

<style scoped>
.v-card__title {
  word-break: normal;
}
</style>
