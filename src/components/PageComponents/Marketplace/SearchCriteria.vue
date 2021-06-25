<template>
  <v-select v-model="input" :items="criteria" solo rounded clearable label="Search events by: " />
</template>

<script lang="ts">
import { Role } from '@/types';
import { computed, defineComponent, ref, watch } from '@vue/composition-api';

export default defineComponent({
  name: 'SearchCriteria',
  props: {
    role: {
      type: String as () => Role,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { role } = props;
    const criteria = computed(() =>
      role === 'Sponsor' ? ['Title', 'Budget', 'Keyword'] : ['Name', 'Keyword'],
    );

    const input = ref('');

    watch(input, () => emit('search-criteria', input.value));

    return {
      criteria,
      input,
    };
  },
});
</script>
