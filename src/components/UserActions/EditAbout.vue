<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template #activator="{ on, attrs }">
      <v-btn icon class="mx-5" v-bind="attrs" v-on="on">
        <v-icon color="black"> mdi-pencil </v-icon>
      </v-btn>
    </template>

    <v-form>
      <v-card>
        <v-card-title>
          <span class="headline"> Edit About </span>
        </v-card-title>

        <v-card-text>
          <v-textarea v-model="input" outlined label="Tell us about your organisation" />
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
import useAuth from '@/composable/authComposition';
import useProfile from '@/composable/profileComposition';
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'EditAbout',
  props: {
    about: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { uid } = useAuth();
    const { editUserProfile } = useProfile();
    const { about } = props;

    const input = ref(about);
    const dialog = ref(false);

    const cancel = () => {
      dialog.value = false;
      input.value = about;
    };

    const edit = async () => {
      dialog.value = false;
      await editUserProfile(uid.value, {
        about: input.value,
      });
    };

    return {
      dialog,
      input,
      cancel,
      edit,
    };
  },
});
</script>
