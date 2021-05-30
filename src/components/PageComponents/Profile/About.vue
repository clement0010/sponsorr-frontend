<template>
  <v-container>
    <v-card-title class="text-h4 black--text">
      About
      <EditAbout
        :about="about"
        @edit-about="payload => $emit('edit', payload)"
      />
    </v-card-title>
    <v-card-text class="black--text text-body-1">
      {{ about }}
    </v-card-text>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import EditAbout from '@/components/UserActions/EditAbout.vue';

export default defineComponent({
  components: {
    EditAbout,
  },
  props: {
    about: {
      type: String,
      required: true,
      default: 'Empty...',
    },
  },
});
</script>
