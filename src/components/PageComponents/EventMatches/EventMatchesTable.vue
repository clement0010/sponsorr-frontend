<template>
  <v-container fluid>
    <v-data-table :headers="headers" :items="matches" :loading="loading">
      <template #no-data>
        No matched events yet
      </template>

      <template #[`item.actions`]="{ item }">
        <MatchActionMenu :match="item" />
      </template>

      <template #loading>
        Loading...
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import MatchActionMenu from '@/components/MatchActions/MatchActionMenu.vue';

import useMatch from '@/composable/matchComposition';
import useAuth from '@/composable/authComposition';
import { computed, defineComponent, onBeforeMount } from '@vue/composition-api';

export default defineComponent({
  name: 'MatchedEventsTable',
  components: {
    MatchActionMenu,
  },
  setup() {
    const { fetchMatchesByOrganiserId, matches, loading } = useMatch();
    const { uid } = useAuth();

    const headers = [
      {
        text: 'Event',
        value: 'title',
      },
      {
        text: 'Sponsor',
        value: 'sponsor',
      },
      {
        text: 'Status',
        value: 'status',
      },
      {
        text: 'Actions',
        value: 'actions',
        align: 'center',
        sortable: false,
      },
    ];

    onBeforeMount(async () => {
      await fetchMatchesByOrganiserId(uid.value);
    });

    return {
      headers,
      matches,
      loading: computed(() => loading.value),
    };
  },
});
</script>
