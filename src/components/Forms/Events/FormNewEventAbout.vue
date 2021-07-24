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
            v-model.number="eventData.budget"
            outlined
            :min="0"
            type="number"
            label="Budget"
            hint="All currency in Singapore Dollars"
            :rules="[requireInputRule, nonNegativeIntegerRule, maximumMonetaryValue]"
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
import NewEventCancel from '@/components/Forms/Events/NewEventCancel.vue';

import { defineComponent, reactive, ref } from '@vue/composition-api';
import {
  requireInputRule,
  nonNegativeIntegerRule,
  maximumMonetaryValue,
} from '@/common/validation';

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
      budget: storage.budget || 0,
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

    const persist = () => {
      const cached = JSON.parse(localStorage.getItem('data') || 'null');
      const data = {
        description: eventData.description,
        eventSize: eventData.participants,
        budget: eventData.budget,
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
