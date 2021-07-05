<template>
  <v-card color="transparent" flat>
    <v-card-title class="text-h4 black--text">
      Keywords
      <EditKeywords @edit-keywords="(payload) => $emit('edit', payload)" />
    </v-card-title>
    <v-card-text>
      <v-chip-group column>
        <v-chip v-for="(keyword, index) in keywords" :key="index" disabled>
          {{ keyword }}
        </v-chip>
      </v-chip-group>
      <p v-if="keywords.length === 0" class="black--text">Empty...</p>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import EditKeywords from '@/components/UserActions/EditKeywords.vue';

import useProfile from '@/composable/profileComposition';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'ProfileKeywords',
  components: {
    EditKeywords,
  },
  setup() {
    const { keywords } = useProfile();

    return {
      keywords,
    };
  },
});
</script>
