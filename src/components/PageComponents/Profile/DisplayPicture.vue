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
      default: 'https://randomuser.me/api/portraits/med/men/31.jpg',
    },
  },
};
</script>
