<template>
  <div>
    <v-card-title class="text-h4">
      Requests
    </v-card-title>
    <v-list elevation="2" class="mx-4">
      <v-list-item v-if="requests.length === 0">
        <v-list-item-title class="font-italic">
          No requests for this event yet. Click "Add Request" to start.
        </v-list-item-title>
      </v-list-item>

      <v-list-item-group v-else>
        <v-list-item v-for="(request, index) in requests" :key="index">
          <v-row align="center">
            <v-col>
              <v-list-item-content>
                <span>
                  <strong>
                    Item:
                  </strong>
                  {{ request.itemName }}
                </span>
                <v-list-item-title>
                  <strong>
                    Description:
                  </strong>
                  {{ request.description }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  <strong>
                    Value:
                  </strong>
                  SGD {{ request.valueInSGD }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-col>
            <v-col v-if="isOwner" cols="auto">
              <v-list-item-action>
                <EditEventRequests
                  :request="request"
                  @edit-request="(updatedRequest) => edit(updatedRequest, index)"
                />
              </v-list-item-action>
              <v-list-item-action v-if="requests.length > 1">
                <v-icon @click="deleteRequest(request)">mdi-close</v-icon>
              </v-list-item-action>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script lang="ts">
import EditEventRequests from '@/components/EventActions/EditEventRequests.vue';
import { SponsorRequest } from '@/types';
import { defineComponent, toRefs } from '@vue/composition-api';

export default defineComponent({
  name: 'EventRequests',
  components: {
    EditEventRequests,
  },
  props: {
    isOwner: {
      type: Boolean,
      required: true,
    },
    requests: {
      type: Array as () => SponsorRequest[],
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const { requests } = toRefs(props);

    const deleteRequest = (request: SponsorRequest) => {
      requests.value.splice(requests.value.indexOf(request), 1);
      emit('edit', {
        requests: requests.value,
      });
    };

    const edit = (updatedRequest: SponsorRequest, index: number) => {
      requests.value.splice(index, 1, updatedRequest);
      emit('edit', {
        requests: requests.value,
      });
    };

    return {
      deleteRequest,
      edit,
    };
  },
});
</script>
