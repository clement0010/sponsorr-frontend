<template>
  <v-fade-transition>
    <v-btn
      v-show="!hide"
      v-scroll="onScroll"
      fab
      fixed
      bottom
      right
      color="accent1"
      @click="scrollTop"
    >
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
  </v-fade-transition>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'ScrollTopButton',
  setup() {
    const hide = ref(true);

    const scrollTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    };

    const onScroll = (e: Element) => {
      if (typeof window === 'undefined') {
        return;
      }
      const top = window.pageYOffset || e.scrollTop || 0;
      hide.value = top < 10;
    };

    return {
      scrollTop,
      onScroll,
      hide,
    };
  },
});
</script>
