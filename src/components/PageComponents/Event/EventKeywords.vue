<template>
  <div>
    <v-card-title class="text-h4">
      Keywords
      <EditEventKeywords />
    </v-card-title>
    <v-card-text>
      <v-chip-group>
        <v-chip v-for="(keyword, index) in keywords" :key="index">
          {{ keyword }}
        </v-chip>
      </v-chip-group>
    </v-card-text>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import EditEventKeywords from '@/components/EventActions/EditEventKeywords.vue';

export default defineComponent({
  name: 'EventKeywords',
  components: {
    EditEventKeywords,
  },
  props: {
    keywords: {
      type: Array as () => string[],
      default: () => [
        'National University of Singapore',
        'College/University',
        'Women',
        'Sports',
        'Charity',
        'Health',
        'Fundarising',
        'Corporate',
        'Dinner',
      ],
    },
  },
});
</script>
