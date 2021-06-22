<template>
  <v-card flat>
    <v-card-title>{{ username }}</v-card-title>
    <v-card-subtitle>{{ role }}</v-card-subtitle>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'UserStatusCard',
  props: {
    username: {
      type: String,
      default: 'Default User',
    },
    role: {
      type: String,
      default: 'Event Organiser',
    },
  },
});
</script>
