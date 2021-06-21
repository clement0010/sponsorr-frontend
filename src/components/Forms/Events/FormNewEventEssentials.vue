<template>
  <v-card>
    <v-card-title> Essential Details </v-card-title>
    <v-form v-model="valid">
      <v-text-field
        v-model="eventData.title"
        outlined
        label="Event Title"
        hint="Give your event a memorable title"
        :rules="[requireInputRule]"
      />
      <v-row>
        <v-col xs="12">
          <v-menu
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="displayDateStart"
                label="Start Date"
                append-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                outlined
                hint="Select a date or a range of dates"
                :rules="[requireInputRule]"
                v-on="on"
              />
            </template>
            <v-date-picker v-model="eventData.dateStart" :min="today" :max="eventData.dateEnd" />
          </v-menu>
        </v-col>

        <v-col xs="12">
          <v-menu
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="displayDateEnd"
                label="End Date"
                append-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                outlined
                hint="Select a date or a range of dates"
                :rules="[requireInputRule]"
                v-on="on"
              />
            </template>
            <v-date-picker v-model="eventData.dateEnd" :min="eventData.dateStart || today" />
          </v-menu>
        </v-col>

        <v-col xs="12">
          <v-menu
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="displayTimeStart"
                outlined
                label="Starts at"
                append-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                hint="What time does your event start?"
                :rules="[requireInputRule]"
                v-on="on"
              />
            </template>
            <v-time-picker v-model="eventData.timeStart" full-width :max="maxTime" />
          </v-menu>
        </v-col>

        <v-col xs="12">
          <v-menu
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="displayTimeEnd"
                outlined
                label="Ends at"
                append-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                hint="What time does your event end?"
                :rules="[requireInputRule]"
                v-on="on"
              />
            </template>
            <v-time-picker v-model="eventData.timeEnd" full-width :min="minTime" />
          </v-menu>
        </v-col>
      </v-row>
      <v-text-field
        v-model="eventData.venue"
        outlined
        label="Venue"
        append-icon="mdi-map-marker"
        hint="Where will your event take place?"
        :rules="[requireInputRule]"
      />

      <v-card-actions>
        <NewEventCancel @cancel="(message) => $emit('cancel', message)" />
        <v-btn :disabled="!valid" text class="success" @click="next"> Next </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from '@vue/composition-api';
import { requireInputRule } from '@/common/validation';
import { generateDate, generateUnixTime, parseTime } from '@/common/utils';
import NewEventCancel from './NewEventCancel.vue';

export default defineComponent({
  name: 'FormNewEventEssentials',
  components: {
    NewEventCancel,
  },
  setup(_, { emit }) {
    const valid = ref(false);

    const eventData = reactive({
      title: '',
      dateStart: '',
      dateEnd: '',
      timeStart: '',
      timeEnd: '',
      venue: '',
    });

    const today = generateDate(undefined, 'YYYY-MM-DD');
    const oneDayEvent = computed(() => eventData.dateStart === eventData.dateEnd);

    const displayDateStart = computed(() =>
      eventData.dateStart ? generateDate(eventData.dateStart) : '',
    );
    const displayDateEnd = computed(() =>
      eventData.dateEnd ? generateDate(eventData.dateEnd) : '',
    );
    const displayTimeStart = computed(() => parseTime(eventData.timeStart));
    const displayTimeEnd = computed(() => parseTime(eventData.timeEnd));

    const persist = () => {
      const data = {
        title: eventData.title,
        date: {
          start: generateUnixTime(`${eventData.dateStart} ${eventData.timeStart}`),
          end: generateUnixTime(`${eventData.dateEnd} ${eventData.timeEnd}`),
        },
        venue: eventData.venue,
      };
      console.log(generateUnixTime(`${eventData.dateStart} ${eventData.timeStart}`));
      console.log(generateUnixTime(`${eventData.dateEnd} ${eventData.timeEnd}`));
      localStorage.setItem('data', JSON.stringify(data));
    };

    const next = () => {
      persist();
      emit('next');
    };

    const minTime = computed(() => {
      if (oneDayEvent.value && eventData.timeStart) {
        return eventData.timeStart;
      }
      return undefined;
    });

    const maxTime = computed(() => {
      if (oneDayEvent.value && eventData.timeEnd) {
        return eventData.timeEnd;
      }
      return undefined;
    });

    return {
      // Form validation
      valid,

      // Payload
      eventData,

      // Output
      displayDateStart,
      displayDateEnd,
      displayTimeStart,
      displayTimeEnd,

      // Input validation
      today,
      requireInputRule,
      minTime,
      maxTime,

      // Navigation
      next,
    };
  },
});
</script>
