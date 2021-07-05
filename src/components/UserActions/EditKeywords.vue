<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template #activator="{ on, attrs }">
      <v-btn icon class="mx-5" v-bind="attrs" v-on="on">
        <v-icon color="black"> mdi-pencil </v-icon>
      </v-btn>
    </template>

    <v-form>
      <v-card>
        <v-card-title>
          <span class="headline">
            Edit Keywords
          </span>
        </v-card-title>

        <v-card-text>
          <v-combobox
            v-model="input"
            outlined
            label="Keywords"
            chips
            multiple
            placeholder="Type away and hit 'enter' to save the keyword"
          />
        </v-card-text>

        <v-card-text class="text-right">
          <v-btn class="error" rounded text @click="cancel"> Cancel </v-btn>
          <v-btn class="success" rounded text :disabled="duplicate" @click="edit"> Save </v-btn>
        </v-card-text>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script lang="ts">
import useProfile from '@/composable/profileComposition';

import { computed, defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'EditProfileKeywordsButton',
  setup(props, { emit }) {
    const { keywords } = useProfile();

    const dialog = ref(false);

    const input = ref(keywords.value);

    const duplicate = computed(
      () =>
        (keywords.value || [])
          .map((keyword) => (input.value || []).includes(keyword))
          .reduce((accumulator, currentValue) => accumulator && currentValue, true) &&
        (input.value || [])
          .map((keyword) => (keywords.value || []).includes(keyword))
          .reduce((accumulator, currentValue) => accumulator && currentValue, true),
    );

    const cancel = () => {
      dialog.value = false; // Closes dialog
      input.value = keywords.value; // Reset
    };

    const edit = () => {
      dialog.value = false; // Closes dialog
      emit('edit-keywords', {
        keywords: input.value,
      });
    };

    return {
      dialog,
      cancel,
      edit,
      input,
      duplicate,
    };
  },
});
</script>
