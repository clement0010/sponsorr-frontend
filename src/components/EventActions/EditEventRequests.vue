<template>
  <v-dialog v-model="dialog" width="500">
    <template #activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" :disabled="status !== 'draft'" v-on="on">
        <v-icon>
          mdi-pencil
        </v-icon>
      </v-btn>
    </template>

    <v-form v-model="valid">
      <v-card>
        <v-card-title>Edit Request</v-card-title>

        <v-card-text>
          <v-text-field
            v-model="input.itemName"
            label="Item"
            :rules="[requireInputRule]"
            outlined
          />
          <v-textarea
            v-model="input.description"
            label="Description"
            :rules="[requireInputRule]"
            outlined
            hint="Elaborate on your request here"
          />
          <v-text-field
            v-model="input.valueInSGD"
            label="Value in SGD"
            :rules="[requireInputRule, nonNegativeIntegerRule]"
            outlined
            type="number"
          />

          <v-card-actions>
            <v-btn class="error" @click="cancel">Cancel</v-btn>
            <v-btn class="success" :disabled="!valid" @click="save">Save</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script lang="ts">
import { requireInputRule, nonNegativeIntegerRule } from '@/common/validation';
import { SponsorRequest } from '@/types';
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'EditEventRequests',
  props: {
    request: {
      type: Object as () => SponsorRequest,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { request } = props;

    const dialog = ref(false);
    const valid = ref(false);

    const input = ref<SponsorRequest>({
      ...request,
    });

    const cancel = () => {
      dialog.value = false;
      input.value = {
        ...request,
      };
    };

    const save = () => {
      dialog.value = false;
      emit('edit-request', input.value);
    };

    return {
      dialog,
      valid,
      input,
      cancel,
      save,

      requireInputRule,
      nonNegativeIntegerRule,
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
