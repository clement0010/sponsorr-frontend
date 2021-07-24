<template>
  <v-tooltip top>
    <template #activator="{ on }">
      <v-btn
        class="warning"
        :small="$route.name !== 'Event'"
        @click="$emit('publishEvent')"
        v-on="on"
      >
        Unpublish
      </v-btn>
    </template>
    <span>
      Saves event to drafts and enables editing
    </span>
  </v-tooltip>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'PublishEventButton',
});
</script>
