<template>
  <v-container fluid>
    <v-data-table
      :headers="headers"
      :items="matches"
      :loading="loading"
      class="elevation-5 rounded-lg"
    >
      <template v-if="$vuetify.breakpoint.mdAndUp" #body="{ items }">
        <tbody>
          <tr v-for="(item, index) in items" :key="index" class="item-row text-center">
            <td>
              {{ item.title }}
            </td>
            <td>
              {{ item.sponsor }}
            </td>
            <td class="text-left status">
              <span>
                <v-badge dot :color="statusColor(item.status)" :offset-y="-0.5" left class="mx-2" />
                {{ `${item.status.charAt(0).toUpperCase()}${item.status.slice(1)}` }}
              </span>
            </td>
            <td>
              <MatchActionMenu :match="item" />
            </td>
          </tr>
        </tbody>
      </template>

      <template #[`item.status`]="{ item }">
        <span>
          <v-badge dot :color="statusColor(item.status)" :offset-y="-0.5" left class="mx-2" />
          {{ `${item.status.charAt(0).toUpperCase()}${item.status.slice(1)}` }}
        </span>
      </template>

      <template #[`item.actions`]="{ item }">
        <MatchActionMenu :match="item" />
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
import { MatchStatus } from '@/types';

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

    const statusColor = (status: MatchStatus) => {
      switch (status) {
        case 'pending':
          return 'yellow';
        case 'rejected':
          return 'red';
        case 'accepted':
          return 'green';
        default:
          return 'white';
      }
    };

    return {
      headers,
      matches,
      loading: computed(() => loading.value),
      statusColor,
    };
  },
});
</script>

<style scoped>
.status {
  width: 1%;
  white-space: nowrap;
}
</style>
