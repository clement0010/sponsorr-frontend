<template>
  <router-link :to="{ name: 'NewEvent' }">
    <v-btn color="accent1">
      <v-icon> mdi-plus </v-icon>
      Create New Event
    </v-btn>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'CreateEventButton',
});
</script>
