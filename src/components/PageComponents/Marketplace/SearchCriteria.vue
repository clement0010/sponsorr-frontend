<template>
  <v-select
    v-model="input"
    :items="criteria"
    solo
    rounded
    outlined
    dense
    clearable
    hide-details
    flat
    label="Search events by: "
  />
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from '@vue/composition-api';

export default defineComponent({
  name: 'SearchCriteria',

  setup(_, { emit }) {
    const criteria = computed(() => ['Title', 'Budget', 'Keywords']);

    const input = ref('Title');

    watch(input, () => emit('search-criteria', input.value));

    return {
      criteria,
      input,
    };
  },
});
</script>
