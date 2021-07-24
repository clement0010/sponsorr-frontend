<template>
  <v-card color="transparent" flat>
    <v-card-title class="text-sm-h4 black--text">
      Keywords
      <EditKeywords v-if="isOwner" :keywords="keywords" />
    </v-card-title>
    <v-card-text>
      <v-chip-group column>
        <v-chip
          v-for="(keyword, index) in keywords"
          :key="index"
          color="white"
          text-color="black"
          :ripple="false"
        >
          {{ keyword }}
        </v-chip>
      </v-chip-group>
      <p v-if="keywords.length === 0" class="black--text">
        Empty...
      </p>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import EditKeywords from '@/components/UserActions/EditKeywords.vue';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'ProfileKeywords',
  components: {
    EditKeywords,
  },
  props: {
    isOwner: {
      type: Boolean,
      required: true,
    },
    keywords: {
      type: Array as () => string[],
      default: () => [],
    },
  },
});
</script>
