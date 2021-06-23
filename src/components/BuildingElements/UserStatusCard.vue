<template>
  <v-card flat>
    <v-card-title>{{ username.toUpperCase() }}</v-card-title>
    <v-card-subtitle>{{
      role === 'EventOrganiser' ? 'Event Organiser' : 'Sponsor'
    }}</v-card-subtitle>
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
