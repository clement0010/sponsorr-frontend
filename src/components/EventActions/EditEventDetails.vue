<template>
  <v-dialog v-model="dialog" width="500">
    <template #activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>

    <v-form v-model="valid">
      <v-card>
        <v-card-title>
          Edit Event Details
        </v-card-title>

        <v-card-text>
          <v-menu
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="dateDisplay"
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
            <v-date-picker v-model="datePicker" range :min="today" />
          </v-menu>

          <v-row>
            <v-col>
              <v-menu>
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="timeDisplayStart"
                    required
                    outlined
                    label="Starts at"
                    v-bind="attrs"
                    :rules="[requireInputRule]"
                    v-on="on"
                  />
                </template>

                <v-time-picker v-model="timePicker.start" :max="maxTime" />
              </v-menu>
            </v-col>
            <v-col>
              <v-menu>
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="timeDisplayEnd"
                    required
                    outlined
                    label="Ends at"
                    v-bind="attrs"
                    :rules="[requireInputRule]"
                    v-on="on"
                  />
                </template>

                <v-time-picker v-model="timePicker.end" :min="minTime" />
              </v-menu>
            </v-col>
          </v-row>
          <v-text-field
            v-model="input.venue"
            required
            outlined
            label="Venue"
            :rules="[requireInputRule]"
          />
          <v-text-field
            v-model.number="input.eventSize"
            required
            outlined
            label="Expected Attendance"
            :rules="[requireInputRule]"
            type="number"
          />
        </v-card-text>

        <v-card-text class="text-right">
          <v-btn class="error" rounded @click="cancel">Cancel</v-btn>
          <v-btn
            class="success"
            rounded
            :disabled="!valid || duplicate"
            type="submit"
            @click="edit"
          >
            Save
          </v-btn>
        </v-card-text>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref, watch } from '@vue/composition-api';
import { requireInputRule } from '@/common/validation';
import { generateDate, generateUnixTime } from '@/common/utils';

export default defineComponent({
  name: 'EditEventDescriptionButton',
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
      required: true,
    },
    eventSize: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const dialog = ref(false);
    const valid = ref(false);

    const input = ref({ ...props });

    const duplicate = computed(
      () =>
        input.value.timeStart === props.timeStart &&
        input.value.timeEnd === props.timeEnd &&
        input.value.venue === props.venue &&
        input.value.eventSize === props.eventSize,
    );
    const today = generateDate(undefined, 'YYYY-MM-DD');

    const timePicker = ref({
      start: generateDate(input.value.timeStart, 'HH:mm'),
      end: generateDate(input.value.timeEnd, 'HH:mm'),
    });
    const timeDisplayStart = computed(() => generateDate(input.value.timeStart, 'hh:mm A'));
    const timeDisplayEnd = computed(() => generateDate(input.value.timeEnd, 'hh:mm A'));
    watch(timePicker.value, (time) => {
      input.value.timeStart = generateUnixTime(
        `${generateDate(input.value.timeStart, 'YYYY-MM-DD')} ${time.start}`,
      );
      input.value.timeEnd = generateUnixTime(
        `${generateDate(input.value.timeEnd, 'YYYY-MM-DD')} ${time.end}`,
      );
    });

    const datePicker: Ref<string[]> = ref([]);
    const dateDisplay = computed(() =>
      [...datePicker.value]
        .sort()
        .map((date) => generateDate(date, 'DD MMM YYYY'))
        .join(' - '),
    );
    watch(datePicker, (newDates) => {
      const timeStart = timeDisplayStart.value;
      const timeEnd = timeDisplayEnd.value;
      const date1 = generateUnixTime(`${newDates[0]} ${timeStart}`);
      let date2;
      input.value.timeStart = generateUnixTime(`${newDates[0]} ${timeStart}`);
      if (newDates.length < 2) {
        date2 = generateUnixTime(`${newDates[0]} ${timeEnd}`);
      } else {
        date2 = generateUnixTime(`${newDates[1]} ${timeEnd}`);
      }
      if (date1 < date2) {
        input.value.timeStart = date1;
        input.value.timeEnd = date2;
        return;
      }
      input.value.timeStart = date2;
      input.value.timeEnd = date1;
    });

    const minTime = computed(() => {
      if (datePicker.value.length < 2) {
        return timePicker.value.start;
      }
      return undefined;
    });

    const maxTime = computed(() => {
      if (datePicker.value.length < 2) {
        return timePicker.value.end;
      }
      return undefined;
    });

    // Setup
    watch(dialog, (active) => {
      const dateStart = computed(() => generateDate(input.value.timeStart, 'YYYY-MM-DD'));
      const dateEnd = computed(() => generateDate(input.value.timeEnd, 'YYYY-MM-DD'));
      const timeStart = computed(() => generateDate(input.value.timeStart, 'HH:mm'));
      const timeEnd = computed(() => generateDate(input.value.timeEnd, 'HH:mm'));
      if (active) {
        datePicker.value = [];
        datePicker.value.push(dateStart.value);
        timePicker.value.start = timeStart.value;
        timePicker.value.end = timeEnd.value;
        if (dateStart.value !== dateEnd.value) {
          datePicker.value.push(dateEnd.value);
        }
      }
    });

    const cancel = () => {
      dialog.value = false; // Closes dialog
      input.value = { ...props }; // Reset
    };

    const edit = () => {
      dialog.value = false;
      emit('edit-event-details', {
        venue: input.value.venue,
        eventSize: input.value.eventSize,
        timeStart: input.value.timeStart,
        timeEnd: input.value.timeEnd,
      });
    };

    return {
      // Config
      dialog,
      valid,

      // Validation
      requireInputRule,
      duplicate,
      today,
      minTime,
      maxTime,

      // Actions
      edit,
      cancel,

      // Input
      input,
      timePicker,
      datePicker,

      // Outputs
      timeDisplayStart,
      timeDisplayEnd,
      dateDisplay,
    };
  },
});
</script>
