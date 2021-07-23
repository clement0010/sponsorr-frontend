<template>
  <v-container fluid :class="background">
    <v-container class="content">
      <v-row align="center" justify="center">
        <v-col v-scroll-animation class="px-0 left" :lg="6">
          <slot name="left-content" />
        </v-col>
        <v-col v-scroll-animation class="px-0 right" :lg="6">
          <slot name="right-content" />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'HomeFrameLayout',
  props: {
    background: {
      type: String,
      default: 'secondary',
    },
  },
});
</script>

<style scoped>
.content {
  max-width: 1320px;
}

.fix {
  word-break: normal;
}

.before-enter.left {
  opacity: 0;
  transform: translateX(-100px);
  transition: all 2s ease-out;
}

.enter.left {
  opacity: 1;
  transform: translateX(0px);
}

.before-enter.right {
  opacity: 0;
  transform: translateX(100px);
  transition: all 2s ease-out;
}

.enter.right {
  opacity: 1;
  transform: translateX(0px);
}
</style>
