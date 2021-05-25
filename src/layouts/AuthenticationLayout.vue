<template>
  <v-container fluid class="pa-0 orange" fill-height>
    <slot></slot>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'AuthenticationLayout',
});
</script>
