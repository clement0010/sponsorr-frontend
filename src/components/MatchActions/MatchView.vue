<template>
  <v-dialog v-model="dialog" width="500">
    <template #activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on">View Offer</v-btn>
    </template>

    <v-card>
      <v-card-title>
        Offers
      </v-card-title>
      <v-list>
        <v-list-item v-for="(message, index) in messages" :key="index">
          <v-list-item-content>
            <v-list-item-subtitle>
              Sent at: {{ generateDate(message.timestamp, 'DD MMM YYYY') }}
            </v-list-item-subtitle>
            <v-list-item-title>
              {{ message.message }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Messages } from '@/types';
import { defineComponent, ref } from '@vue/composition-api';
import { generateDate } from '@/common/utils';

export default defineComponent({
  name: 'MatchView',
  props: {
    messages: {
      type: Array as () => Messages,
      required: true,
    },
  },
  setup() {
    const dialog = ref(false);

    return {
      dialog,
      generateDate,
    };
  },
});
</script>
