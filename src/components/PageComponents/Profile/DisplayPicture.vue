<template>
  <v-avatar size="200">
    <v-img :src="urlPic" />
  </v-avatar>
</template>

<script lang="ts">
export default {
  props: {
    urlPic: {
      type: String,
      required: true,
    },
  },
};
</script>
