<template>
  <v-dialog v-model="dialog">
    <template #activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on">Add Request</v-btn>
    </template>

    <v-form v-model="valid">
      <v-card>
        <v-card-title>New Request</v-card-title>

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
            <v-btn @click="cancel">Cancel</v-btn>
            <v-btn @click="save">Save</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script lang="ts">
import { SponsorRequest } from '@/types';
import { defineComponent, reactive, ref } from '@vue/composition-api';
import { requireInputRule, nonNegativeIntegerRule } from '@/common/validation';

export default defineComponent({
  name: 'NewRequestCreateButton',
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
