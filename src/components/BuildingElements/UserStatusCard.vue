<template>
  <v-card flat>
    <v-card-title v-if="name">
      {{ name.toUpperCase() }}
    </v-card-title>
    <v-card-subtitle>
      {{ role === 'EventOrganiser' ? 'Event Organiser' : 'Sponsor' }}
    </v-card-subtitle>
  </v-card>
</template>

<script lang="ts">
import useProfile from '@/composable/profileComposition';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'UserStatusCard',
  setup() {
    const { profile, role } = useProfile();

    return {
      name: profile.value?.name,
      role,
    };
  },
});
</script>
