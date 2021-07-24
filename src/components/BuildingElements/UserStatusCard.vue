<template>
  <v-list-item v-if="mobile">
    <v-list-item-content>
      <v-list-item-title>
        <strong>
          {{ name.toUpperCase() }}
        </strong>
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ role }}
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
  <v-list-item v-else>
    <v-list-item-content>
      <v-list-item-title>
        <strong>
          {{ name.toUpperCase() }}
        </strong>
        <v-btn icon class="m-10" @click.stop="$emit('toggleSideBar')">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ role }}
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import { role, userProfile } from '@/composable/store';

import { computed, defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'UserStatusCard',
  props: {
    mobile: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {
      name: computed(() => userProfile.value?.name || ''),
      role,
    };
  },
});
</script>
