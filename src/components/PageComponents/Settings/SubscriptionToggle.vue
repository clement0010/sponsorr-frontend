<template>
  <v-switch v-model="toggle" inset>
    <template #label>
      <v-tooltip right>
        <template #activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on">
            {{ toggle ? '✅ Subscribed to matching service! ' : 'Subscribe to matching service' }}
          </span>
        </template>
        <span v-if="!toggle">
          Enables the machine learning matching magic!
        </span>
        <span v-else>
          The matching magic is turned on!
        </span>
      </v-tooltip>
    </template>
  </v-switch>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'SubscriptionToggle',
  setup() {
    const toggle = ref(false);

    return {
      toggle,
    };
  },
});
</script>
