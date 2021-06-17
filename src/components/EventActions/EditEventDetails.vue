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
            <v-date-picker v-model="datePicker" :min="generateDate(undefined, 'YYYY-MM-DD')" />
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

                <v-time-picker v-model="input.eventTimeStart" :max="input.eventTimeEnd" />
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

                <v-time-picker v-model="input.eventTimeEnd" :min="input.eventTimeStart" />
              </v-menu>
            </v-col>
          </v-row>
          <v-text-field
            v-model="input.eventVenue"
            required
            outlined
            label="Venue"
            :rules="[requireInputRule]"
          />
          <v-text-field
            v-model.number="input.eventExpectedAttendance"
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
import { computed, defineComponent, ref, watch } from '@vue/composition-api';
import { requireInputRule } from '@/common/validation';
import { generateDate, generateUnixTime, parseTime } from '@/common/utils';

export default defineComponent({
  name: 'EditEventDescriptionButton',
  props: {
    eventDate: {
      type: Number,
      required: true,
    },
    eventTimeStart: {
      type: String,
      required: true,
    },
    eventTimeEnd: {
      type: String,
      required: true,
    },
    eventVenue: {
      type: String,
      required: true,
    },
    eventExpectedAttendance: {
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
        generateDate(input.value.eventDate) === generateDate(props.eventDate) &&
        input.value.eventTimeStart === props.eventTimeStart &&
        input.value.eventTimeEnd === props.eventTimeEnd &&
        input.value.eventVenue === props.eventVenue &&
        input.value.eventExpectedAttendance === props.eventExpectedAttendance,
    );

    const datePicker = ref(generateDate(props.eventDate, 'YYYY-MM-DD'));
    const dateDisplay = computed(() => generateDate(datePicker.value, 'DD MMM YYYY'));
    watch(datePicker, (newDate) => {
      input.value.eventDate = generateUnixTime(newDate);
    });

    const timeDisplayStart = computed(() => parseTime(input.value.eventTimeStart));
    const timeDisplayEnd = computed(() => parseTime(input.value.eventTimeEnd));

    const cancel = () => {
      dialog.value = false; // Closes dialog
      input.value = { ...props }; // Reset
      datePicker.value = generateDate(props.eventDate, 'YYYY-MM-DD'); // Reset
    };

    const edit = () => {
      dialog.value = false;
      emit('edit-event-details', {
        date: input.value.eventDate,
        venue: input.value.eventVenue,
        attendance: input.value.eventExpectedAttendance,
        timeStart: input.value.eventTimeStart,
        timeEnd: input.value.eventTimeEnd,
      });
    };

    return {
      dialog,
      input,
      cancel,
      requireInputRule,
      edit,
      valid,
      duplicate,
      generateDate,
      dateDisplay,
      datePicker,
      timeDisplayStart,
      timeDisplayEnd,
    };
  },
});
</script>
