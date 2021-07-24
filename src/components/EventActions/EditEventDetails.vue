<template>
  <v-dialog v-model="dialog" width="500" persistent>
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
                    v-model="dateStartDisplay"
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
                <v-date-picker v-model="input.dateStart" :min="today" :max="input.dateEnd" />
              </v-menu>
            </v-col>

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
                    v-model="dateEndDisplay"
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
                <v-date-picker v-model="input.dateEnd" :min="input.dateStart || today" />
              </v-menu>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-menu>
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="timeStartDisplay"
                    required
                    outlined
                    label="Starts at"
                    v-bind="attrs"
                    :rules="[requireInputRule]"
                    v-on="on"
                  />
                </template>
                <v-time-picker v-model="input.timeStart" :max="maxTime" />
              </v-menu>
            </v-col>

            <v-col>
              <v-menu>
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="timeEndDisplay"
                    required
                    outlined
                    label="Ends at"
                    v-bind="attrs"
                    :rules="[requireInputRule]"
                    v-on="on"
                  />
                </template>

                <v-time-picker v-model="input.timeEnd" :min="minTime" />
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

          <v-row>
            <v-col>
              <v-text-field
                v-model.number="input.budget"
                outlined
                :min="0"
                type="number"
                label="Budget"
                hint="All currency in Singapore Dollars"
                :rules="[requireInputRule, nonNegativeIntegerRule, maximumMonetaryValue]"
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-text class="text-right">
          <v-btn class="error" rounded @click="cancel">Cancel</v-btn>
          <v-btn class="success" rounded :disabled="!valid || duplicate" @click="edit">
            Save
          </v-btn>
        </v-card-text>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import {
  requireInputRule,
  nonNegativeIntegerRule,
  maximumMonetaryValue,
} from '@/common/validation';
import { generateDate, generateUnixTime, parseTime } from '@/common/utils';

export default defineComponent({
  name: 'EditEventDescriptionButton',
  props: {
    dateStart: {
      type: String,
      required: true,
    },
    dateEnd: {
      type: String,
      required: true,
    },
    timeStart: {
      type: String,
      required: true,
    },
    timeEnd: {
      type: String,
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
    budget: {
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
        input.value.dateStart === props.dateStart &&
        input.value.dateEnd === props.dateEnd &&
        input.value.timeStart === props.timeStart &&
        input.value.timeEnd === props.timeEnd &&
        input.value.venue === props.venue &&
        input.value.eventSize === props.eventSize &&
        input.value.budget === props.budget,
    );
    const today = generateDate(undefined, 'YYYY-MM-DD');
    const oneDayEvent = computed(() => input.value.dateStart === input.value.dateEnd);

    const minTime = computed(() => {
      if (oneDayEvent.value && input.value.timeStart) {
        return input.value.timeStart;
      }
      return undefined;
    });
    const maxTime = computed(() => {
      if (oneDayEvent.value && input.value.timeEnd) {
        return input.value.timeEnd;
      }
      return undefined;
    });

    const dateStartDisplay = computed(() => generateDate(input.value.dateStart, 'DD MMM YYYY'));
    const dateEndDisplay = computed(() => generateDate(input.value.dateEnd, 'DD MMM YYYY'));
    const timeStartDisplay = computed(() => parseTime(input.value.timeStart));
    const timeEndDisplay = computed(() => parseTime(input.value.timeEnd));

    const cancel = () => {
      dialog.value = false; // Closes dialog
      input.value = { ...props }; // Reset
    };

    const edit = () => {
      const start = generateUnixTime(`${input.value.dateStart} ${input.value.timeStart}`);
      const end = generateUnixTime(`${input.value.dateEnd} ${input.value.timeEnd}`);
      dialog.value = false;
      emit('edit-event-details', {
        venue: input.value.venue,
        eventSize: input.value.eventSize,
        date: {
          start,
          end,
        },
        budget: input.value.budget,
      });
    };

    return {
      // Config
      dialog,
      valid,

      // Validation
      requireInputRule,
      nonNegativeIntegerRule,
      maximumMonetaryValue,
      duplicate,
      today,
      minTime,
      maxTime,

      // Actions
      edit,
      cancel,

      // Input
      input,

      // Outputs
      dateStartDisplay,
      dateEndDisplay,
      timeStartDisplay,
      timeEndDisplay,
    };
  },
});
</script>

<style scoped>
::v-deep input::-webkit-outer-spin-button,
::v-deep input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
