<template>
  <v-tooltip top>
    <template #activator="{ on }">
      <v-btn
        class="success"
        :small="$route.name !== 'Event'"
        @click="$emit('publishEvent')"
        v-on="on"
      >
        Publish
      </v-btn>
    </template>
    <span>
      Publishes the event and disables editing
    </span>
  </v-tooltip>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'PublishEventButton',
});
</script>
