<template>
  <v-img v-if="picture" :src="picture" height="150" />
  <v-img v-else src="@/assets/image-placeholder.svg" height="150" contain />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'EventPicture',
  props: {
    picture: {
      type: String,
      default: '',
    },
  },
});
</script>
