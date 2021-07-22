<template>
  <v-container class="secondary" fluid>
    <v-container class="content">
      <v-row align="center">
        <v-col cols="auto">
          <v-card-title class="text-h2">
            My Matches
            <MatchesHelp />
          </v-card-title>
        </v-col>
      </v-row>
      <v-row justify="center">
        <MatchesTable
          :match-categories="matchCategories"
          :loading="loading"
          @fetchMatches="(matchCategory) => $emit('fetchMatches', matchCategory)"
          @refetch="$emit('refetch')"
        />
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import MatchesHelp from '@/components/UserAssistance/MatchesHelp.vue';
import MatchesTable from '@/components/PageComponents/Matches/MatchesTable.vue';

import { MatchCategory } from '@/types';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'MatchesLayout',
  components: {
    MatchesHelp,
    MatchesTable,
  },
  props: {
    matchCategories: {
      type: Array as () => MatchCategory[],
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<style scoped>
.content {
  max-width: 1320px;
  min-height: 87vh;
}
</style>
