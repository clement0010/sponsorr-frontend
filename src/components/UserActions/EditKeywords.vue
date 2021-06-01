<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon class="mx-5" v-bind="attrs" v-on="on">
        <v-icon color="black"> mdi-pencil </v-icon>
      </v-btn>
    </template>

    <v-form>
      <v-card light>
        <v-card-title>
          <span class="headline"> Edit Keywords </span>
        </v-card-title>

        <v-card-text>
          <v-chip-group column class="px-4">
            <v-chip
              v-for="(keyword, index) in input"
              :key="keyword"
              close
              @click:close="removeKeyword(index)"
            >
              {{ keyword }}
            </v-chip>
          </v-chip-group>

          <v-text-field
            v-model="keywordInput"
            class="px-4"
            dense
            outlined
            label="Type here and hit 'enter' to save"
            @keydown.enter="addKeyword"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn class="error" rounded text @click="cancel"> Cancel </v-btn>
          <v-btn class="success" rounded text @click="edit"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from '@vue/composition-api';

export default defineComponent({
  props: {
    keywords: {
      type: Array as () => string[],
      required: true,
    },
  },
  setup(props, { emit }) {
    const { keywords } = toRefs(props);
    const input = keywords.value;

    const keywordInput = ref('');
    const dialog = ref(false); // Dialog is closed by default

    const cancel = () => {
      dialog.value = false; // Closes dialog
    };

    const edit = () => {
      dialog.value = false; // Closes dialog
      emit('edit-keywords', {
        keywords: input,
      });
    };

    const removeKeyword = (index: number): void => {
      input.splice(index, 1);
    };

    const addKeyword = (e: Event): void => {
      e.preventDefault();

      input.push(keywordInput.value);
      keywordInput.value = '';
    };

    return {
      dialog,
      cancel,
      edit,
      input,
      removeKeyword,
      addKeyword,
      keywordInput,
    };
  },
});
</script>
