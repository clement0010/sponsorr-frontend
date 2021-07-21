<template>
  <v-container fluid class="primary pa-0 pb-15">
    <slot />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'BasePage',
});
</script>
