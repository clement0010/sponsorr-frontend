<template>
  <v-btn class="warning" :small="$route.name !== 'Event'" @click="$emit('publishEvent')">
    Unpublish (enable edit)
  </v-btn>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'PublishEventButton',
});
</script>
