<template>
  <v-btn text class="warning" @click="cancel"> Cancel </v-btn>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'NewEventCancelButton',
  setup(_, { emit }) {
    const cancel = () => {
      localStorage.removeItem('data');
      emit('cancel', 'Event creation cancelled');
    };

    return { cancel };
  },
});
</script>
