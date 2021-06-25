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
          <SearchCriteria
            :role="role"
            @search-criteria="(criteria) => $emit('search-criteria', criteria)"
          />
        </v-col>
        <v-col>
          <SearchBar :loading="loading" :role="role" @search="(input) => $emit('search', input)" />
        </v-col>
      </v-row>
      <v-row>
        <SearchResult v-if="input" :input="input" :search-result="searchResult" :role="role" />
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import SearchBar from '@/components/PageComponents/Marketplace/SearchBar.vue';
import SearchCriteria from '@/components/PageComponents/Marketplace/SearchCriteria.vue';
import SearchResult from '@/components/PageComponents/Marketplace/SearchResult.vue';
import { Role, Sponsor, SponsorEventDbItems } from '@/types';

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
    role: {
      type: String as () => Role,
      required: true,
    },
    input: {
      type: String,
      required: true,
    },
    searchResult: {
      type: Array as () => Sponsor[] | SponsorEventDbItems,
      default: () => [],
    },
  },
});
</script>

<style scoped>
.content {
  max-width: 1320px;
}
</style>
