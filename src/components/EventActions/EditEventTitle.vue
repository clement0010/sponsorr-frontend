<template>
  <v-dialog v-model="dialog" width="500">
    <template #activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>

    <v-form v-model="valid">
      <v-card>
        <v-card-title>
          Edit Event Title
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="input"
            required
            outlined
            label="Title"
            :rules="[requireInputRule]"
          />
        </v-card-text>

        <v-card-text class="text-right">
          <v-btn class="error" rounded @click="cancel">Cancel</v-btn>
          <v-btn
            class="success"
            rounded
            :disabled="!valid || duplicate"
            type="submit"
            @click="edit"
          >
            Save
          </v-btn>
        </v-card-text>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import { requireInputRule } from '@/common/validation';

export default defineComponent({
  name: 'EditEventTitleButton',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const dialog = ref(false);
    const input = ref(props.title);
    const valid = ref(false);
    const duplicate = computed(() => input.value === props.title);

    const cancel = () => {
      dialog.value = false; // Closes dialog
      input.value = props.title;
    };

    const edit = () => {
      dialog.value = false;
      emit('edit-title', {
        title: input.value,
      });
    };

    return {
      dialog,
      input,
      cancel,
      requireInputRule,
      edit,
      valid,
      duplicate,
    };
  },
});
</script>
