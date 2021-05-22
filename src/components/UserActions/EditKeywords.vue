<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon class="mx-5" v-bind="attrs" v-on="on">
        <v-icon color="black">
          mdi-pencil
        </v-icon>
      </v-btn>
    </template>

    <v-card light>
      <v-card-title>
        <span class="headline">
          Edit Keywords
        </span>
      </v-card-title>
      <v-chip-group column class="px-4">
        <v-chip
          close
          v-for="keyword in keywords"
          :key="keyword"
          @click:close="remove(keyword, keywords)"
        >
          {{ keyword }}
        </v-chip>
      </v-chip-group>
      <v-text-field
        class="px-4"
        dense
        outlined
        v-model="input"
        @keydown.enter="
          add(input, keywords);
          input = '';
        "
        label="Type here and hit 'enter' to save"
      ></v-text-field>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineComponent, ref, toRefs } from '@vue/composition-api';
import { profile, remove, add } from '@/utils/profile';

export default defineComponent({
  setup() {
    const { keywords } = toRefs(profile);
    const input = ref('');

    const dialog = ref(false); // Dialog is closed by default

    return {
      dialog,
      keywords,
      remove,
      input,
      add,
    };
  },
});
</script>
