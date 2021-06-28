<template>
  <v-container fluid>
    <v-card-title> {{ headline }} </v-card-title>
    <v-row v-if="searchResult">
      <v-col v-for="(result, index) in searchResult" :key="index">
        <EventCard :event="result" :authenticated="authenticated" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Role, Sponsor, SponsorEventDbItems } from '@/types';
import { computed, defineComponent, toRefs } from '@vue/composition-api';
import EventCard from '@/components/PageComponents/Marketplace/EventCard.vue';

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
    role: {
      type: String as () => Role,
      required: true,
    },
    authenticated: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const { searchResult, input } = toRefs(props);

    const headline = computed(() => {
      const numResults = searchResult.value.length;
      if (numResults === 0) {
        return `No results for "${input.value}"`;
      }
      if (numResults > 1) {
        return `${numResults} results for "${input.value}"`;
      }
      return `${numResults} result for "${input.value}"`;
    });

    return {
      headline,
    };
  },
});
</script>
