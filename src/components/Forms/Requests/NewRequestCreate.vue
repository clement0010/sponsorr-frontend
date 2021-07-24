<template>
  <v-dialog v-model="dialog" persistent>
    <template #activator="{ on, attrs }">
      <v-btn v-bind="attrs" :disabled="status !== 'draft'" v-on="on">Add Request</v-btn>
    </template>

    <v-form v-model="valid">
      <v-card>
        <v-card-title>
          New Request
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="requestData.itemName"
            label="Item"
            :rules="[requireInputRule]"
            outlined
          />
          <v-textarea
            v-model="requestData.description"
            label="Description"
            :rules="[requireInputRule]"
            outlined
            hint="Elaborate on your request here"
          />
          <v-text-field
            v-model="requestData.valueInSGD"
            label="Value in SGD"
            :rules="[requireInputRule, nonNegativeIntegerRule]"
            outlined
            type="number"
          />

          <v-card-actions>
            <v-btn class="warning" text @click="cancel">
              Cancel
            </v-btn>
            <v-btn class="success" :disabled="!valid" text @click="save">
              Save
            </v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script lang="ts">
import { SponsorRequest } from '@/types';
import { requireInputRule, nonNegativeIntegerRule } from '@/common/validation';
import { defineComponent, reactive, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'NewRequestCreateButton',
  props: {
    status: {
      type: String,
      default: 'draft',
    },
  },
  setup(_, { emit }) {
    const valid = ref(false);
    const dialog = ref(false);

    const requestData = reactive<SponsorRequest>({
      itemName: '',
      description: '',
      valueInSGD: '',
    });

    const resetRequestData = (): void => {
      requestData.itemName = '';
      requestData.description = '';
      requestData.valueInSGD = '';
    };

    const save = () => {
      emit('save', requestData);
      dialog.value = false;
      resetRequestData();
    };

    const cancel = () => {
      dialog.value = false;
      resetRequestData();
    };

    return {
      valid,
      dialog,
      requestData,
      save,
      cancel,
      // Input validation
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
