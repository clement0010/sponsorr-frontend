<template>
  <v-container class="secondary" fluid>
    <v-container>
      <v-row align="center">
        <v-col cols="auto">
          <v-card-title> Dashboard </v-card-title>
        </v-col>
        <v-spacer />
        <v-col cols="auto">
          <CreateEvent />
        </v-col>
      </v-row>
      <v-row justify="center">
        <EventTable />
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import CreateEvent from '@/components/UserActions/CreateEvent.vue';
import EventTable from '@/components/PageComponents/Dashboard/EventTable.vue';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'DashboardLayout',
  components: {
    CreateEvent,
    EventTable,
  },
});
</script>
