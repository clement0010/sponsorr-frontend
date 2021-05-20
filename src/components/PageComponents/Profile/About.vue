<template>
  <v-card color="transparent" flat width="75%">
    <v-card-title class="black--text text-h4">
      About
      <EditAbout />
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
  components: {
    EditAbout,
  },
  props: {
    about: String,
  },
});
</script>
