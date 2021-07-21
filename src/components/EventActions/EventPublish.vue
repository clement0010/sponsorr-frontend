<template>
  <v-btn class="success" :small="$route.name !== 'Event'" @click="$emit('publishEvent')">
    Publish (disable edit)
  </v-btn>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'PublishEventButton',
});
</script>
