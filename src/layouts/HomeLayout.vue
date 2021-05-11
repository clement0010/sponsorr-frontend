<template>
    <v-container fluid class="pa-0">
        <slot name="introduction"></slot>
        <slot name="howitworks"></slot>
        <slot name="benefits"></slot>
        <slot name="teams"></slot>
    </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import BasePage from './BasePage.vue';

export default defineComponent({
  components: {
    BasePage,
  },
});
</script>
