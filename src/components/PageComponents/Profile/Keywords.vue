<template>
  <v-card color="transparent" flat width="75%">
    <v-card-title class="text-h4 black--text">
      Keywords
      <EditKeywords />
    </v-card-title>

    <v-card-text>
      <v-chip-group>
        <v-chip v-for="keyword in keywords" :key="keyword" disabled>
          {{ keyword }}
        </v-chip>
      </v-chip-group>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import EditKeywords from '@/components/UserActions/EditKeywords.vue';

export default {
  props: ['keywords'],
  components: {
    EditKeywords,
  },
};
</script>
