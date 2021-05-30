<template>
  <v-container
    class="px-12"
    fluid
    style="height: 100%;"
  >
    <v-row>
      <v-col>
        <slot name="left-content" />
      </v-col>
      <v-col>
        <slot name="right-content" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'HomeFrameLayout',
});
</script>
