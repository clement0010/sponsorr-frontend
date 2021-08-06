<template>
  <v-dialog :value="activate" width="500">
    <v-card class="text-center" data-cy="modal-accept-match">
      <v-card-title class="justify-center">
        Match Accepted!
      </v-card-title>
      <v-card-text>
        Connect with your match 👇
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn text rounded color="error" data-cy="modal-accept-match-close-button" @click="close">
          Close
        </v-btn>
        <router-link
          :to="{ name: 'Profile', params: { id: matchUserId } }"
          data-cy="modal-accept-match-visit-button"
        >
          <v-btn text rounded>
            View Your Match
          </v-btn>
        </router-link>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'MatchAcceptedModal',
  props: {
    activate: {
      type: Boolean,
      required: true,
    },
    matchUserId: {
      type: String,
      default: '',
    },
  },
  setup(_, { emit }) {
    const close = () => {
      emit('toggleModal');
    };
    return {
      close,
    };
  },
});
</script>
