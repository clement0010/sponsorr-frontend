<template>
  <v-img contain src="@/assets/logo-sponsorr.svg" :width="width" aspect-ratio />
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
