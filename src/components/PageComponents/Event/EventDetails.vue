<template>
  <div>
    <v-card-title class="text-h4">
      Details
      <EditEventDetails
        v-if="isOwner && status === 'draft'"
        :date-start="editDateStart"
        :date-end="editDateEnd"
        :time-start="editStart"
        :time-end="editEnd"
        :event-size="eventSize"
        :venue="venue"
        :budget="budget"
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
    <v-list-item>
      <v-list-item-title>
        <strong>
          Budget:
        </strong>
        {{ currencyFormatter(budget) }}
      </v-list-item-title>
    </v-list-item>
  </div>
</template>

<script lang="ts">
import EditEventDetails from '@/components/EventActions/EditEventDetails.vue';

import { computed, defineComponent } from '@vue/composition-api';
import { generateDate, currencyFormatter } from '@/common/utils';

export default defineComponent({
  name: 'EventDetails',
  components: {
    EditEventDetails,
  },
  props: {
    isOwner: {
      type: Boolean,
      required: true,
    },
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
    status: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const dateStart = computed(() => generateDate(props.timeStart, 'DD MMM YYYY'));
    const dateEnd = computed(() => generateDate(props.timeEnd, 'DD MMM YYYY'));
    const start = computed(() => generateDate(props.timeStart, 'hh:mm A'));
    const end = computed(() => generateDate(props.timeEnd, 'hh:mm A'));

    const editDateStart = computed(() => generateDate(props.timeStart, 'YYYY-MM-DD'));
    const editDateEnd = computed(() => generateDate(props.timeEnd, 'YYYY-MM-DD'));
    const editStart = computed(() => generateDate(props.timeStart, 'HH:mm'));
    const editEnd = computed(() => generateDate(props.timeEnd, 'HH:mm'));

    const oneDayEvent = computed(() => dateStart.value === dateEnd.value);

    const eventDate = computed(() =>
      oneDayEvent.value ? dateStart.value : `${dateStart.value} - ${dateEnd.value}`,
    );

    const eventTime = computed(() => `${start.value} - ${end.value}`);

    return {
      eventDate,
      eventTime,
      start,
      end,
      editDateStart,
      editDateEnd,
      editStart,
      editEnd,
      currencyFormatter,
    };
  },
});
</script>
