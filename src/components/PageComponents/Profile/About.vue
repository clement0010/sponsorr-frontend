<template>
  <v-card color="transparent" flat>
    <v-card-title class="text-h4 black--text">
      About
      <EditAbout @edit-about="(payload) => $emit('edit', payload)" />
    </v-card-title>
    <v-card-text class="black--text text-body-1">
      {{ about }}
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import EditAbout from '@/components/UserActions/EditAbout.vue';

import useProfile from '@/composable/profileComposition';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'ProfileAbout',
  components: {
    EditAbout,
  },
  setup() {
    const { about } = useProfile();

    return {
      about,
    };
  },
});
</script>
