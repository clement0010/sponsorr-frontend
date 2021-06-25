<template>
  <v-dialog v-model="dialog" width="500">
    <template #activator="{ on, attrs }">
      <v-btn v-bind="attrs" class="success" :disabled="disabled" v-on="on">
        {{ prompt }}
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
import { computed, defineComponent, ref } from '@vue/composition-api';
import { requireInputRule } from '@/common/validation';

export default defineComponent({
  name: 'ApplyEventButton',
  props: {
    sending: {
      type: Boolean,
      default: false,
    },
  },
  setup(_, { emit }) {
    const dialog = ref(false);
    const valid = ref(false);
    const disabled = ref(true);

    const prompt = computed(() => (disabled.value ? 'Application Closed' : 'Apply'));

    const input = ref('');

    const cancel = () => {
      dialog.value = false;
      input.value = '';
    };

    const send = () => {
      emit('apply', input.value);
      dialog.value = false;
      input.value = '';
    };

    return {
      // Config
      dialog,
      valid,
      disabled,

      // Data
      input,

      // Validation
      requireInputRule,

      // Actions
      cancel,
      send,

      // Output
      prompt,
    };
  },
});
</script>
