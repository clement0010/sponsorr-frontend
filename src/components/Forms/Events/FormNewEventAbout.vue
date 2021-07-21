<template>
  <v-card>
    <v-card-title> About The Event </v-card-title>
    <v-form v-model="valid">
      <v-textarea
        v-model="eventData.description"
        outlined
        label="Event Description"
        hint="Tell sponsors what is your event about"
        :rules="[requireInputRule]"
      />
      <v-row>
        <v-col>
          <v-text-field
            v-model.number="eventData.participants"
            outlined
            :min="0"
            type="number"
            label="Expected Number of Attendees"
            :rules="[requireInputRule, nonNegativeIntegerRule]"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model.number="eventData.budgetMin"
            outlined
            :min="0"
            type="number"
            label="Budget (minimum)"
            hint="All currency in Singapore Dollars"
            :rules="[requireInputRule, nonNegativeIntegerRule, minBudgetRule, maximumMonetaryValue]"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model.number="eventData.budgetMax"
            outlined
            :min="0"
            type="number"
            label="Budget (maximum)"
            hint="All currency in Singapore Dollars"
            :rules="[requireInputRule, nonNegativeIntegerRule, maxBudgetRule, maximumMonetaryValue]"
          />
        </v-col>
      </v-row>

      <v-select
        v-model="eventData.demographic"
        outlined
        label="Demographic"
        multiple
        chips
        :items="demographic"
        :rules="[vselectRule]"
      />

      <v-combobox
        v-model="eventData.keywords"
        outlined
        label="Keywords"
        hint="Keywords are words or short phrases that help other users to quickly understand your event"
        chips
        multiple
        placeholder="Type away and hit 'enter' to save the keyword"
        :rules="[vselectRule]"
      >
      </v-combobox>
      <v-card-actions>
        <NewEventCancel />
        <v-btn @click="navigate('back')"> Back </v-btn>
        <v-btn :disabled="!valid" class="success" @click="navigate('next')"> Next </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@vue/composition-api';
import {
  requireInputRule,
  nonNegativeIntegerRule,
  maximumMonetaryValue,
} from '@/common/validation';
import NewEventCancel from './NewEventCancel.vue';

export default defineComponent({
  name: 'FormNewEventAbout',
  components: {
    NewEventCancel,
  },
  setup(_, { emit }) {
    const valid = ref(false);
    const storage = JSON.parse(localStorage.getItem('data') || '{}');

    const eventData = reactive({
      description: storage.description || '',
      participants: storage.eventSize || 0,
      budgetMin: storage.budget?.minimum || 0,
      budgetMax: storage.budget?.maximum || 0,
      demographic: storage.demographic || [],
      keywords: storage.keywords || [],
    });

    const demographic = [
      'Public',
      'Senior Citizens',
      'Adults',
      'University/College',
      'Teens',
      'Children',
    ];

    const vselectRule = (input: string[]) => input.length > 0 || 'Required';

    const maxBudgetRule = (budget: number) => {
      if (!eventData.budgetMin) {
        return true;
      }
      return eventData.budgetMin <= budget || 'Enter a higher value';
    };

    const minBudgetRule = (budget: number) => {
      if (!eventData.budgetMax) {
        return true;
      }
      return eventData.budgetMax >= budget || 'Enter a lower value';
    };

    const persist = () => {
      const cached = JSON.parse(localStorage.getItem('data') || 'null');
      const data = {
        description: eventData.description,
        eventSize: eventData.participants,
        budget: {
          maximum: eventData.budgetMax,
          minimum: eventData.budgetMin,
        },
        demographic: eventData.demographic,
        keywords: eventData.keywords,
      };
      const stored = {
        ...cached,
        ...data,
      };
      localStorage.setItem('data', JSON.stringify(stored));
    };

    const navigate = (direction: string) => {
      persist();
      if (direction === 'next') {
        emit('next');
      }
      if (direction === 'back') {
        emit('back');
      }
    };

    return {
      // Form validation
      valid,

      // Input validation
      requireInputRule,
      nonNegativeIntegerRule,
      maxBudgetRule,
      minBudgetRule,
      vselectRule,
      maximumMonetaryValue,

      // Payload
      eventData,
      demographic,

      // Navigation
      navigate,
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
