<template>
  <v-container fluid>
    <v-data-table
      :headers="headers"
      :items="matches"
      :loading="loading"
      class="elevation-5 rounded-lg"
    >
      <template #body="{ items }">
        <tbody>
          <tr v-for="item in items" :key="item.title" class="item-row text-center">
            <td>
              {{ item.title }}
            </td>
            <td>
              {{ item.sponsor }}
            </td>
            <td>
              {{ `${item.status.charAt(0).toUpperCase()}${item.status.slice(1)}` }}
            </td>
            <td><MatchActionMenu :match="item" /></td>
          </tr>
        </tbody>
      </template>

      <template #loading>
        Loading...
      </template>

      <template #no-data>
        No matched events yet
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
        sortable: false,
        align: 'center',
      },
      {
        text: 'Sponsor',
        value: 'sponsor',
        sortable: false,
        align: 'center',
      },
      {
        text: 'Status',
        value: 'status',
        align: 'center',
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
