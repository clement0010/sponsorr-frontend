<template>
  <v-avatar size="200">
    <v-img :src="urlPic" />
  </v-avatar>
</template>

<script>
export default {
  props: ['urlPic'],
};
</script>
