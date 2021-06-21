<template>
  <div>
    <v-card-title class="text-h4">
      Details
      <EditEventDetails
        :date-start="editDateStart"
        :date-end="editDateEnd"
        :time-start="editStart"
        :time-end="editEnd"
        :event-size="eventSize"
        :venue="venue"
        @edit-event-details="(payload) => $emit('edit', payload)"
      />
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
        {{ venue }}
      </v-list-item-title>
    </v-list-item>
    <v-list-item>
      <v-list-item-title>
        <strong>
          Expected Attendance:
        </strong>
        {{ eventSize }}
      </v-list-item-title>
    </v-list-item>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { generateDate } from '@/common/utils';
import EditEventDetails from '@/components/EventActions/EditEventDetails.vue';

export default defineComponent({
  name: 'EventDetails',
  components: {
    EditEventDetails,
  },
  props: {
    timeStart: {
      type: Number,
      required: true,
    },
    timeEnd: {
      type: Number,
      required: true,
    },
    venue: {
      type: String,
      default: 'The Foo Bar and Bistro',
    },
    eventSize: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const dateStart = generateDate(props.timeStart, 'DD MMM YYYY');
    const dateEnd = generateDate(props.timeEnd, 'DD MMM YYYY');
    const start = generateDate(props.timeStart, 'hh:mm A');
    const end = generateDate(props.timeEnd, 'hh:mm A');

    const editDateStart = generateDate(props.timeStart, 'YYYY-MM-DD');
    const editDateEnd = generateDate(props.timeEnd, 'YYYY-MM-DD');
    const editStart = generateDate(props.timeStart, 'HH:mm');
    const editEnd = generateDate(props.timeEnd, 'HH:mm');

    const oneDayEvent = dateStart === dateEnd;

    const eventDate = oneDayEvent ? dateStart : `${dateStart} - ${dateEnd}`;

    const eventTime = `${start} - ${end}`;

    return {
      eventDate,
      eventTime,
      start,
      end,
      editDateStart,
      editDateEnd,
      editStart,
      editEnd,
    };
  },
});
</script>
