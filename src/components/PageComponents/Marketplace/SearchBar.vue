<template>
  <v-autocomplete
    solo
    rounded
    flat
    dense
    outlined
    hide-no-data
    hide-details
    :search-input.sync="input"
    :loading="loading"
    :items="events"
    :filter="filter"
    placeholder="Search for events"
    data-cy="search-input"
    @keypress.enter="$emit('search', input)"
  >
    <template #label>
      Search for events
    </template>

    <template #append>
      <v-btn v-if="input" icon @click="clear">
        <v-icon>
          mdi-close
        </v-icon>
      </v-btn>

      <v-btn icon :disabled="disabled" @click="$emit('search', input)">
        <v-icon>
          mdi-magnify
        </v-icon>
      </v-btn>
    </template>
  </v-autocomplete>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api';
import { Sponsor } from '@/types';

export default defineComponent({
  name: 'SearchBar',
  props: {
    filter: {
      type: Function,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      default: (item: Sponsor, queryText: string, itemText: string) => true,
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const { loading } = props;
    const input = ref('');
    const disabled = ref(true);

    const clear = () => {
      input.value = '';
    };

    const sponsors = ref([]);
    const events = ref([]);

    // For autocomplete only
    watch(input, (query) => {
      if (query === '' || loading) {
        disabled.value = true;
      }
      if (query !== '') {
        disabled.value = false;
      }
      // Search from database
      // Manipulate sponsors array
      // Filtering will be done by the supplied filter function in props
    });

    return {
      disabled,
      sponsors,
      events,
      input,
      clear,
    };
  },
});
</script>
