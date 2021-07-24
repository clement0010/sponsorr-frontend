<template>
  <v-container fluid>
    <v-card-title> {{ headline }} </v-card-title>
    <v-row v-if="searchResult">
      <v-col v-for="(result, index) in searchResult" :key="index" lg="3" md="4" sm="6">
        <EventCard :event="result" class="zoom" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import EventCard from '@/components/PageComponents/Marketplace/EventCard.vue';

import { Sponsor, SponsorEventDbItems } from '@/types';
import { computed, defineComponent, toRefs } from '@vue/composition-api';

export default defineComponent({
  name: 'SearchResult',
  components: {
    EventCard,
  },
  props: {
    input: {
      type: String,
      required: true,
    },
    searchResult: {
      type: Array as () => Sponsor[] | SponsorEventDbItems,
      default: () => [],
    },
  },
  setup(props) {
    const { searchResult, input } = toRefs(props);

    const headline = computed(() => {
      if (!input.value) {
        return 'All Results:';
      }

      const numResults = searchResult.value.length;
      if (numResults === 0) {
        return `No results for ${input.value}`;
      }
      if (numResults > 1) {
        return `${numResults} results for ${input.value}`;
      }
      return `${numResults} result for "${input.value}"`;
    });

    return {
      headline,
    };
  },
});
</script>

<style scoped>
.zoom {
  transition: transform 0.3s; /* Animation */
}

.zoom:hover {
  transform: scale(1.05);
}
</style>
