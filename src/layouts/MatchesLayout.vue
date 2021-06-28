<template>
  <v-container class="secondary" fluid>
    <v-container class="content">
      <v-row align="center">
        <v-col cols="auto">
          <v-card-title class="text-h2"> My Matches </v-card-title>
        </v-col>
      </v-row>
      <v-row justify="center">
        <MatchesTable
          :match-categories="matchCategories"
          @fetchMatches="(matchCategory) => $emit('fetchMatches', matchCategory)"
          @acceptMatch="(payload) => $emit('acceptMatch', payload)"
          @rejectMatch="(payload) => $emit('rejectMatch', payload)"
        />
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import MatchesTable from '@/components/PageComponents/Matches/MatchesTable.vue';
import { MatchCategory } from '@/types';

export default defineComponent({
  name: 'MatchesLayout',
  components: {
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
