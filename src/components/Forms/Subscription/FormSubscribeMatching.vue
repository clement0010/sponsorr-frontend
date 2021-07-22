<template>
  <v-dialog v-model="dialog" width="500">
    <template #activator="{ attrs, on }">
      <v-btn v-bind="attrs" class="success" v-on="on">
        Subscribe to matching service
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        Subscribe to matching service
      </v-card-title>
      <v-card-subtitle>
        Input your sponsorship criteria
      </v-card-subtitle>
      <v-card-text>
        <v-form v-model="valid">
          <v-text-field
            v-model.number="input.eventSize"
            outlined
            label="Event size"
            type="number"
            :min="0"
            :rules="[nonNegativeIntegerRule, requireInputRule]"
          />

          <v-row>
            <v-col>
              <v-text-field
                v-model.number="input.budgetMin"
                outlined
                label="Budget (minimum)"
                hint="All currency in Singapore Dollars"
                type="number"
                :rules="[minBudgetRule, nonNegativeIntegerRule, requireInputRule]"
                :min="0"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model.number="input.budgetMax"
                outlined
                label="Budget (maximum)"
                hint="All currency in Singapore Dollars"
                type="number"
                :rules="[maxBudgetRule, nonNegativeIntegerRule, requireInputRule]"
                :min="0"
              />
            </v-col>
          </v-row>
          <v-select
            v-model="input.demographic"
            outlined
            label="Demographic"
            multiple
            chips
            :items="demographic"
            :rules="[vselectRule]"
          />

          <v-card-actions class="justify-end">
            <v-btn class="error" @click="cancel">
              Cancel
            </v-btn>
            <v-btn class="success" :disabled="!valid" @click="subscribe">
              Subscribe
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import useAuth from '@/composable/authComposition';
import useProfile from '@/composable/profileComposition';
import { requireInputRule, nonNegativeIntegerRule } from '@/common/validation';
import { defineComponent, reactive, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'FormSubscribeMatching',
  setup(_, { emit }) {
    const { uid } = useAuth();
    const { editUserProfile } = useProfile();
    const dialog = ref(false);
    const valid = ref(false);

    const input = reactive({
      budgetMax: 0,
      budgetMin: 0,
      eventSize: 0,
      demographic: [],
    });

    const demographic = [
      'Public',
      'Senior Citizens',
      'Adults',
      'University/College',
      'Teens',
      'Children',
    ];

    const maxBudgetRule = (budget: number) => {
      if (!input.budgetMin) {
        return true;
      }
      return input.budgetMin <= budget || 'Enter a higher value';
    };

    const minBudgetRule = (budget: number) => {
      if (!input.budgetMax) {
        return true;
      }
      return input.budgetMax >= budget || 'Enter a lower value';
    };

    const vselectRule = (arr: string[]) => arr.length > 0 || 'Required';

    const cancel = () => {
      dialog.value = false;
      input.budgetMax = 0;
      input.budgetMin = 0;
      input.eventSize = 0;
      input.demographic = [];
    };

    const subscribe = async () => {
      dialog.value = false;
      await editUserProfile(uid.value, {
        subscription: {
          budget: {
            maximum: input.budgetMax,
            minimum: input.budgetMin,
          },
          eventSize: input.eventSize,
          demographic: input.demographic,
        },
        subscribed: true,
      });
      input.budgetMax = 0;
      input.budgetMin = 0;
      input.eventSize = 0;
      input.demographic = [];
      emit('subscribe');
    };

    return {
      dialog,
      valid,
      input,
      cancel,
      subscribe,
      demographic,

      maxBudgetRule,
      minBudgetRule,
      requireInputRule,
      nonNegativeIntegerRule,
      vselectRule,
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
