<template>
  <v-container>
    <v-avatar size="200">
      <v-img v-if="!urlPic" src="@/assets/icon-profile.svg" />
      <v-img v-else :src="urlPic" />
    </v-avatar>
    <EditDisplayPicture
      :url-pic="urlPic"
      @edit-display-picture="(payload) => $emit('edit', payload)"
    />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import EditDisplayPicture from '@/components/UserActions/EditDisplayPicture.vue';

export default defineComponent({
  name: 'ProfileDisplayPicture',
  components: {
    EditDisplayPicture,
  },
  props: {
    urlPic: {
      type: String,
    },
  },
});
</script>
