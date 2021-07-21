<template>
  <v-dialog v-model="dialog" width="500">
    <template #activator="{ on, attrs }">
      <v-btn v-bind="attrs" class="success" :disabled="applied || disabled" v-on="on">
        Apply
      </v-btn>
    </template>

    <v-form v-model="valid">
      <v-card>
        <v-card-title>
          Apply For Event
        </v-card-title>

        <v-card-text>
          <v-textarea
            v-model="input"
            label="Make an offer"
            outlined
            required
            :rules="[requireInputRule]"
          />
        </v-card-text>

        <v-card-text class="text-right">
          <v-btn class="error" rounded @click="cancel">Cancel</v-btn>
          <v-btn class="success" rounded :disabled="!valid" @click="send">
            Send Application
          </v-btn>
        </v-card-text>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { requireInputRule } from '@/common/validation';
import { generateUnixTime } from '@/common';
import useAuth from '@/composable/authComposition';
import useEvent from '@/composable/eventComposition';

export default defineComponent({
  name: 'ApplyEventButton',
  props: {
    eventId: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    ownerId: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { uid } = useAuth();
    const { applyEvent } = useEvent();
    const { eventId, ownerId } = props;

    const dialog = ref(false);
    const valid = ref(false);
    const applied = ref(false);

    const input = ref('');

    const cancel = () => {
      dialog.value = false;
      input.value = '';
    };

    const send = async () => {
      dialog.value = false;
      await applyEvent(eventId, uid.value, ownerId, [
        { message: input.value, timestamp: generateUnixTime() },
      ]);
      emit('refetch');
      input.value = '';
      applied.value = true;
    };

    return {
      // Config
      dialog,
      valid,
      applied,

      // Data
      input,

      // Validation
      requireInputRule,

      // Actions
      cancel,
      send,
    };
  },
});
</script>
