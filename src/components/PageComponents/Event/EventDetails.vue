<template>
  <div>
    <v-card-title class="text-h4">
      Details
      <EditEventDetails
        :event-size="eventSize"
        :time-start="timeStart"
        :time-end="timeEnd"
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
import { computed, defineComponent } from '@vue/composition-api';
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
    const eventDate = computed(() => {
      const dateStart = generateDate(props.timeStart, 'DD MMM YYYY');
      const dateEnd = generateDate(props.timeEnd, 'DD MMM YYYY');
      if (dateStart === dateEnd) {
        return dateStart;
      }
      return `${dateStart} - ${dateEnd}`;
    });

    const eventTime = computed(
      () =>
        `${generateDate(props.timeStart, 'hh:mm A')} - ${generateDate(props.timeEnd, 'hh:mm A')}`,
    );

    return {
      eventDate,
      eventTime,
    };
  },
});
</script>
