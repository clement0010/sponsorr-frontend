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
        <v-col>
          <v-menu
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="dateRange"
                label="Date"
                append-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                outlined
                hint="Select a date or a range of dates"
                :rules="[requireInputRule]"
                v-on="on"
              />
            </template>
            <v-date-picker
              v-model="eventData.dates"
              range
              :min="generateDate(undefined, 'YYYY-MM-DD')"
            />
          </v-menu>
        </v-col>
        <v-col>
          <v-row>
            <v-col>
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
                    v-model="eventData.timeStart"
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

            <v-col>
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
                    v-model="eventData.timeEnd"
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
import { generateDate } from '@/common/utils';
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
      dates: [], // ISO8601 Date format, YYYY-MM-DD
      timeStart: '',
      timeEnd: '',
      venue: '',
    });

    const dateRange = computed(() =>
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      eventData.dates
        .sort()
        .map((date) => generateDate(date))
        .join(' to '),
    );

    const persist = () => {
      localStorage.setItem('title', eventData.title);
      localStorage.setItem('dates', JSON.stringify(eventData.dates));
      localStorage.setItem('timeStart', eventData.timeStart);
      localStorage.setItem('timeEnd', eventData.timeEnd);
      localStorage.setItem('venue', eventData.venue);
    };

    const next = () => {
      persist();
      emit('next');
    };

    const minTime = computed(() => {
      if (eventData.dates.length < 2 && eventData.timeStart) {
        return eventData.timeStart;
      }
      return undefined;
    });

    const maxTime = computed(() => {
      if (eventData.dates.length < 2 && eventData.timeEnd) {
        return eventData.timeEnd;
      }
      return undefined;
    });

    return {
      // Form validation
      valid,

      // Payload
      eventData,

      // Date formatting
      dateRange,

      // Input validation
      requireInputRule,
      minTime,
      maxTime,

      // Navigation
      next,

      // Date picker
      generateDate,
    };
  },
});
</script>
