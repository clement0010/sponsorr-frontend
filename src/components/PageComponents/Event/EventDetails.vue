<template>
  <div>
    <v-card-title class="text-h4">
      Details
      <EditEventDetails />
    </v-card-title>

    <v-list-item>
      <v-list-item-title>
        <strong>
          Date:
        </strong>
        {{ eventDate }}
      </v-list-item-title>
    </v-list-item>
    <v-list-item>
      <v-list-item-title>
        <strong>
          Time:
        </strong>
        {{ eventTime }}
      </v-list-item-title>
    </v-list-item>
    <v-list-item>
      <v-list-item-title>
        <strong>
          Venue:
        </strong>
        {{ eventVenue }}
      </v-list-item-title>
    </v-list-item>
    <v-list-item>
      <v-list-item-title>
        <strong>
          Expected Attendance:
        </strong>
        {{ eventExpectedAttendance }}
      </v-list-item-title>
    </v-list-item>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import EditEventDetails from '@/components/EventActions/EditEventDetails.vue';

export default defineComponent({
  name: 'EventDetails',
  components: {
    EditEventDetails,
  },
  props: {
    eventDate: {
      type: String,
      default: '10 December 2021',
    },
    eventTime: {
      type: String,
      default: '10:30pm - 11:30pm',
    },
    eventVenue: {
      type: String,
      default: 'The Foo Bar and Bistro',
    },
    eventExpectedAttendance: {
      type: Number,
      default: 200,
    },
  },
});
</script>
