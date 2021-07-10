<template>
  <v-card color="transparent" flat>
    <v-card-title class="text-h4 black--text">
      About
      <EditAbout v-if="isOwner" :about="about" />
    </v-card-title>
    <v-card-text class="black--text text-body-1">
      {{ about }}
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import EditAbout from '@/components/UserActions/EditAbout.vue';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'ProfileAbout',
  components: {
    EditAbout,
  },
  props: {
    about: {
      type: String,
      required: true,
    },
    isOwner: {
      type: Boolean,
      required: true,
    },
  },
});
</script>
