<template>
  <v-container class="secondary" fluid>
    <v-container class="content">
      <v-row align="center">
        <v-col cols="auto">
          <v-card-title class="text-h2"> Dashboard </v-card-title>
        </v-col>
        <v-spacer />
        <v-col cols="auto">
          <EventCreate />
        </v-col>
      </v-row>
      <v-row justify="center">
        <EventTable
          :event-data="eventData"
          @publish="(payload) => $emit('publish', payload)"
          @unpublish="(payload) => $emit('unpublish', payload)"
          @deleteEvent="(payload) => $emit('deleteEvent', payload)"
        />
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import EventCreate from '@/components/EventActions/EventCreate.vue';
import EventTable from '@/components/PageComponents/Dashboard/EventTable.vue';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'DashboardLayout',
  components: {
    EventCreate,
    EventTable,
  },
  props: {
    eventData: {
      type: Array,
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
