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
      <v-text-field
        v-model="eventData.nature"
        outlined
        label="Nature of Event"
        :rules="[requireInputRule]"
      />
      <v-text-field
        v-model="eventData.participants"
        outlined
        :min="0"
        type="number"
        label="Expected Number of Participants"
        :rules="[requireInputRule, nonNegativeIntegerRule]"
      />
      <v-combobox
        v-model="eventData.keywords"
        outlined
        label="Keywords"
        hint="Keywords are words or short phrases that help other users to quickly understand your event"
        chips
        multiple
        placeholder="Type away and hit 'enter' to save the keyword"
        :rules="[requireInputRule]"
      >
      </v-combobox>
      <v-card-actions>
        <NewEventCancel @cancel="(message) => $emit('cancel', message)" />
        <v-btn @click="navigate('back')"> Back </v-btn>
        <v-btn :disabled="!valid" class="success" @click="navigate('next')"> Next </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@vue/composition-api';
import { requireInputRule, nonNegativeIntegerRule } from '@/common/validation';
import NewEventCancel from './NewEventCancel.vue';

export default defineComponent({
  name: 'FormNewEventAbout',
  components: {
    NewEventCancel,
  },
  setup(_, { emit }) {
    const valid = ref(false);

    const eventData = reactive({
      description: '',
      nature: '',
      participants: '',
      keywords: [],
    });

    const persist = () => {
      localStorage.setItem('description', eventData.description);
      localStorage.setItem('nature', eventData.nature);
      localStorage.setItem('participants', eventData.participants);
      localStorage.setItem('keywords', JSON.stringify(eventData.keywords));
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

      // Payload
      eventData,

      // Navigation
      navigate,
    };
  },
});
</script>
