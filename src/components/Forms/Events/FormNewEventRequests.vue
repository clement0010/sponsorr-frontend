<template>
  <v-card>
    <v-card-title> Sponsorship Requests </v-card-title>
    <v-card-subtitle> Tell us what you need for your event to work! </v-card-subtitle>

    <v-card flat>
      <v-card-text v-if="noRequests">
        <v-list elevation="2">
          <v-list-item>
            <v-list-item-title class="font-italic">
              No requests for this event yet. Click "Add Request" to start.
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>

      <v-card-text v-else>
        <v-list v-for="(request, index) in eventData" :key="index" elevation="2">
          <v-list-item>
            <v-row align="center">
              <v-col>
                <v-list-item-title class="my-2">
                  Request: {{ request.itemName }}
                </v-list-item-title>

                <v-list-item-title> Description: </v-list-item-title>
                <v-list-item-subtitle class="text-wrap">
                  {{ request.description }}
                </v-list-item-subtitle>

                <v-list-item-title class="mt-2"> Value: </v-list-item-title>
                <v-list-item-subtitle class="mb-2">
                  S$ {{ request.valueInSGD }}
                </v-list-item-subtitle>
              </v-col>

              <v-col cols="auto">
                <v-list-item-action>
                  <NewRequestEdit :sponsor-request="request" />
                </v-list-item-action>
                <v-list-item-action>
                  <v-icon @click="deleteRequest(request)"> mdi-close </v-icon>
                </v-list-item-action>
              </v-col>
            </v-row>
          </v-list-item>
        </v-list>
        <v-divider inset />
      </v-card-text>

      <v-card-actions>
        <NewRequestCreate @save="(requestData) => save(requestData)" />
      </v-card-actions>
    </v-card>

    <v-card-actions>
      <NewEventCancel @cancel="(message) => $emit('cancel', message)" />
      <v-btn @click="navigate('back')"> Back </v-btn>
      <v-btn :disabled="noRequests" class="success" @click="navigate('next')"> Next </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import { SponsorRequest } from '@/types';
import NewEventCancel from '@/components/Forms/Events/NewEventCancel.vue';
import NewRequestCreate from '@/components/Forms/Requests/NewRequestCreate.vue';
import NewRequestEdit from '@/components/Forms/Requests/NewRequestEdit.vue';

export default defineComponent({
  name: 'FormNewEventRequests',
  components: {
    NewEventCancel,
    NewRequestCreate,
    NewRequestEdit,
  },
  setup(_, { emit }) {
    const dialog = ref(false);
    const valid = ref(false);
    const storage = JSON.parse(localStorage.getItem('data') || '{}');

    const eventData = ref<SponsorRequest[]>(storage.requests || []);

    const noRequests = computed(() => eventData.value.length < 1);

    const deleteRequest = (request: SponsorRequest) => {
      eventData.value.splice(eventData.value.indexOf(request), 1);
    };

    const save = (requestData: SponsorRequest) => {
      const data: SponsorRequest = { ...requestData };
      eventData.value.push(data);
    };

    const persist = () => {
      const cached = JSON.parse(localStorage.getItem('data') || 'null');
      const data = {
        requests: eventData.value,
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
      // Navigation
      navigate,

      // Data
      eventData,
      noRequests,

      // Form validation
      dialog,
      valid,

      // Form actions
      save,

      // Operations
      deleteRequest,
    };
  },
});
</script>
