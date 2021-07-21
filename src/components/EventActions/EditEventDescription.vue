<template>
  <v-dialog v-model="dialog" width="500" persistent>
    <template #activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" :disabled="status !== 'draft'" v-on="on">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>

    <v-form v-model="valid">
      <v-card>
        <v-card-title>
          Edit Event Description
        </v-card-title>

        <v-card-text>
          <v-textarea
            v-model="input"
            required
            outlined
            label="Description"
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
import { EventGroup } from '@/types/enum';

export default defineComponent({
  name: 'EditEventDescriptionButton',
  props: {
    description: {
      type: String,
      required: true,
    },
    status: {
      type: Object as () => EventGroup,
      required: true,
    },
  },
  setup(props, { emit }) {
    const dialog = ref(false);
    const input = ref(props.description);
    const valid = ref(false);
    const duplicate = computed(() => input.value === props.description);

    const cancel = () => {
      dialog.value = false; // Closes dialog
      input.value = props.description;
    };

    const edit = () => {
      dialog.value = false;
      emit('edit-description', {
        description: input.value,
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
