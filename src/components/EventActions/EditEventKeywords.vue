<template>
  <v-dialog v-model="dialog" width="500">
    <template #activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>

    <v-form>
      <v-card>
        <v-card-title>
          Edit Keywords
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
          <v-btn class="error" rounded @click="cancel">Cancel</v-btn>
          <v-btn class="success" rounded :disabled="duplicate" type="submit" @click="edit">
            Save
          </v-btn>
        </v-card-text>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'EditEventKeywordsButton',
  props: {
    keywords: {
      type: Array as () => string[],
      required: true,
    },
  },
  setup(props, { emit }) {
    const dialog = ref(false);

    const input = ref(props.keywords);

    const duplicate = computed(
      () =>
        props.keywords
          .map((keyword) => input.value.includes(keyword))
          .reduce((accumulator, currentValue) => accumulator && currentValue, true) &&
        input.value
          .map((keyword) => props.keywords.includes(keyword))
          .reduce((accumulator, currentValue) => accumulator && currentValue, true),
    );

    const cancel = () => {
      dialog.value = false;
      input.value = props.keywords; // Reset
    };

    const edit = () => {
      dialog.value = false;
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
