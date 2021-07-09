<template>
  <v-dialog v-model="dialog" width="500">
    <template #activator="{ on, attrs }">
      <span v-bind="attrs" v-on="on">
        Change password
      </span>
    </template>
    <v-card>
      <v-card-title>
        Change Password
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="input.currentPassword"
            outlined
            label="Current password"
            :type="showCurrentPassword ? 'text' : 'password'"
            :append-icon="showCurrentPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[requireInputRule]"
            @click:append="showCurrentPassword = !showCurrentPassword"
          />
          <v-text-field
            v-model="input.newPassword"
            outlined
            label="New password"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[requireInputRule, passwordLengthRule]"
            @click:append="showPassword = !showPassword"
          />
          <v-text-field
            v-model="input.confirmPassword"
            outlined
            label="Confirm new password"
            :type="showConfirmPassword ? 'text' : 'password'"
            :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[requireInputRule, passwordLengthRule, validatePassword]"
            @click:append="showConfirmPassword = !showConfirmPassword"
          />
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn class="error" @click="cancel">
          Cancel
        </v-btn>
        <v-btn class="success" :disabled="!valid" @click="save">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { requireInputRule, passwordLengthRule } from '@/common/validation';
import { defineComponent, reactive, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'ChangePassword',
  setup() {
    const dialog = ref(false);

    const configuration = reactive({
      valid: false,
      showCurrentPassword: false,
      showPassword: false,
      showConfirmPassword: false,
    });

    const input = reactive({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });

    const validatePassword = (password: string) =>
      input.newPassword === password || 'Password do not match';

    const cancel = () => {
      dialog.value = false;
      input.currentPassword = '';
      input.newPassword = '';
      input.confirmPassword = '';
    };

    // TODO: change password logic
    const save = async () => {
      dialog.value = false;
    };

    return {
      dialog,
      input,

      requireInputRule,
      passwordLengthRule,

      cancel,
      save,

      ...configuration,

      validatePassword,
    };
  },
});
</script>
