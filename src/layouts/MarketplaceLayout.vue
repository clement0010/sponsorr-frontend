<template>
  <v-container fluid class="secondary">
    <v-container class="content">
      <v-row>
        <v-card-title class="text-h2">
          Marketplace
        </v-card-title>
      </v-row>
      <v-row justify="center" align="center">
        <v-col cols="3">
          <SearchCriteria @search-criteria="(criteria) => $emit('search-criteria', criteria)" />
        </v-col>
        <v-col>
          <SearchBar :loading="loading" @search="(input) => $emit('search', input)" />
        </v-col>
      </v-row>
      <v-row justify="center">
        <SearchResult :input="input" :search-result="searchResult" :authenticated="authenticated" />
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import SearchBar from '@/components/PageComponents/Marketplace/SearchBar.vue';
import SearchCriteria from '@/components/PageComponents/Marketplace/SearchCriteria.vue';
import SearchResult from '@/components/PageComponents/Marketplace/SearchResult.vue';
import { Sponsor, SponsorEventDbItems } from '@/types';

export default defineComponent({
  name: 'MarketplaceLayout',
  components: {
    SearchBar,
    SearchCriteria,
    SearchResult,
  },
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    input: {
      type: String,
      required: true,
    },
    searchResult: {
      type: Array as () => Sponsor[] | SponsorEventDbItems,
      default: () => [],
    },
    authenticated: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<style scoped>
.content {
  max-width: 1320px;
}
</style>
