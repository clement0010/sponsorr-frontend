<template>
  <div>
    <v-card-title class="text-h4">
      Requests
      <v-spacer />
      <NewRequestCreate v-if="isOwner" :status="status" @save="(request) => addRequest(request)" />
    </v-card-title>
    <v-list elevation="2" class="mx-4 mb-4">
      <v-list-item v-if="requests.length === 0">
        <v-list-item-title class="font-italic">
          No requests for this event yet.
          <span v-if="isOwner">
            Click "Add Request" to start.
          </span>
        </v-list-item-title>
      </v-list-item>

      <v-list-item-group v-else>
        <v-list-item v-for="(request, index) in requests" :key="index">
          <v-row align="center">
            <v-col>
              <v-list-item-content>
                <v-list-item-title class="text-wrap">
                  <strong>
                    Item:
                  </strong>
                  {{ request.itemName }}
                </v-list-item-title>

                <v-list-item-title class="text-wrap">
                  <strong>
                    Description:
                  </strong>
                  {{ request.description }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  <strong>
                    Value:
                  </strong>
                  {{ currencyFormatter(request.valueInSGD) }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-col>
            <v-col v-if="isOwner" cols="auto">
              <v-list-item-action>
                <EditEventRequests
                  :request="request"
                  :status="status"
                  @edit-request="(updatedRequest) => edit(updatedRequest, index)"
                />
              </v-list-item-action>
              <v-list-item-action>
                <v-icon :disabled="status !== 'draft'" @click="deleteRequest(index)">
                  mdi-close
                </v-icon>
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
import NewRequestCreate from '@/components/Forms/Requests/NewRequestCreate.vue';

import { currencyFormatter } from '@/common/utils';
import { SponsorRequest } from '@/types';
import { defineComponent, toRefs } from '@vue/composition-api';

export default defineComponent({
  name: 'EventRequests',
  components: {
    EditEventRequests,
    NewRequestCreate,
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
    status: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { requests } = toRefs(props);

    const deleteRequest = (index: number) => {
      requests.value.splice(index, 1);
      emit('edit', {
        requests: requests.value,
      });
    };

    const edit = (updatedRequest: SponsorRequest, index: number) => {
      const data: SponsorRequest = {
        ...updatedRequest,
      };
      requests.value.splice(index, 1, data);
      emit('edit', {
        requests: requests.value,
      });
    };

    const addRequest = (request: SponsorRequest) => {
      const data: SponsorRequest = {
        ...request,
      };
      requests.value.push(data);
      emit('edit', {
        requests: requests.value,
      });
    };

    return {
      deleteRequest,
      addRequest,
      edit,
      currencyFormatter,
    };
  },
});
</script>

<style scoped>
.pre-formatted {
  white-space: pre-line; /* collapse WS, preserve LB */
}

.v-list-item-title {
  word-break: normal; /* maybe !important  */
}
</style>
