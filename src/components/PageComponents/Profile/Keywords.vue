<template>
  <v-card
    color="transparent"
    flat
  >
    <v-card-title class="text-h4 black--text">
      Keywords
      <EditKeywords
        :keywords="keywords"
        @edit-keywords="payload => $emit('edit', payload)"
      />
    </v-card-title>
    <v-card-text>
      <v-chip-group column>
        <v-chip
          v-for="keyword in keywords"
          :key="keyword"
          disabled
        >
          {{ keyword }}
        </v-chip>
      </v-chip-group>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import EditKeywords from '@/components/UserActions/EditKeywords.vue';

export default defineComponent({
  name: 'ProfileKeywords',
  components: {
    EditKeywords,
  },
  props: {
    keywords: {
      type: Array as () => string[],
      required: true,
      default: (): string[] => ['Default value'],
    },
  },
});
</script>
