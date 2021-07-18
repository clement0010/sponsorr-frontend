<template>
  <v-dialog v-model="dialog">
    <template #activator="{ on, attrs }">
      <v-icon v-bind="attrs" v-on="on">mdi-pencil</v-icon>
    </template>

    <v-form v-model="valid">
      <v-card>
        <v-card-title>Edit Request</v-card-title>

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
import { defineComponent, ref } from '@vue/composition-api';
import { requireInputRule, nonNegativeIntegerRule } from '@/common/validation';

export default defineComponent({
  name: 'NewRequestEditButton',
  props: {
    sponsorRequest: {
      type: Object as () => SponsorRequest,
      required: true,
    },
  },
  setup(props) {
    const dialog = ref(false);
    const valid = ref(false);

    const { sponsorRequest } = props;

    const requestData = ref<SponsorRequest>({
      ...sponsorRequest,
    });

    const resetRequestData = (): void => {
      requestData.value = { ...sponsorRequest };
    };

    const save = () => {
      sponsorRequest.itemName = requestData.value.itemName;
      sponsorRequest.description = requestData.value.description;
      sponsorRequest.valueInSGD = requestData.value.valueInSGD;
      dialog.value = false;
    };

    const cancel = () => {
      dialog.value = false;
      resetRequestData();
    };

    return {
      dialog,
      valid,
      requestData,
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
