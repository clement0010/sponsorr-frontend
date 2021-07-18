<template>
  <v-img
    contain
    src="https://firebasestorage.googleapis.com/v0/b/sponsorr-dev.appspot.com/o/public_assets%2Flogo-sponsorr.svg?alt=media&token=d97380a1-6d36-434e-9a14-c22bb420f7f9"
    :width="width"
    aspect-ratio
  />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'LogoSponsorr',
  props: {
    width: {
      type: Number,
      required: true,
    },
  },
});
</script>
