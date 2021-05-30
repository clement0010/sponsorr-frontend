<template>
  <v-container
    fluid
    class="pa-0"
  >
    <slot name="introduction" />
    <slot name="howitworks" />
    <slot name="benefits" />
    <slot name="teams" />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'HomeLayout',
});
</script>
