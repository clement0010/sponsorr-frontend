<template>
  <v-card color="transparent" flat width="75%">
    <v-card-title class="black--text text-h4">
      About
      <EditAbout @save="passToLayout" />
    </v-card-title>

    <v-card-text class="black--text text-body-1">
      {{ about }}
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import EditAbout from '@/components/EditAbout.vue';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  components: {
    EditAbout,
  },
  props: ['about'],
  setup(props, { emit }) {
    const passToLayout = (about: string) => {
      emit('passToLayout', about);
    };

    return {
      passToLayout,
    };
  },
});
</script>
