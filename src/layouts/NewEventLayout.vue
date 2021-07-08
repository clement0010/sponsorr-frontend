<template>
  <v-container class="secondary" fluid>
    <v-container class="content">
      <v-stepper v-model="steps">
        <v-stepper-header>
          <v-stepper-step step="1"> Essential Details </v-stepper-step>
          <v-divider />
          <v-stepper-step step="2"> About The Event </v-stepper-step>
          <v-divider />
          <v-stepper-step step="3"> Sponsorship Requests </v-stepper-step>
          <v-divider />
          <v-stepper-step step="4"> Documents </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <FormNewEventEssentials @next="steps++" />
          </v-stepper-content>
          <v-stepper-content step="2">
            <FormNewEventAbout @next="steps++" @back="steps--" />
          </v-stepper-content>
          <v-stepper-content step="3">
            <FormNewEventRequests @next="steps++" @back="steps--" />
          </v-stepper-content>
          <v-stepper-content step="4">
            <FormNewEventDocuments @back="steps--" />
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import FormNewEventEssentials from '@/components/Forms/Events/FormNewEventEssentials.vue';
import FormNewEventAbout from '@/components/Forms/Events/FormNewEventAbout.vue';
import FormNewEventRequests from '@/components/Forms/Events/FormNewEventRequests.vue';
import FormNewEventDocuments from '@/components/Forms/Events/FormNewEventDocuments.vue';

export default defineComponent({
  name: 'NewEventLayout',
  components: {
    FormNewEventEssentials,
    FormNewEventAbout,
    FormNewEventRequests,
    FormNewEventDocuments,
  },
  setup(_, { emit }) {
    const steps = ref(1);

    const redirect = (message: string) => {
      emit('redirect', message);
    };

    return {
      steps,
      redirect,
    };
  },
});
</script>

<style scoped>
.content {
  max-width: 1320px;
  min-height: 87vh;
}
</style>
