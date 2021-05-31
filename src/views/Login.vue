<template>
  <AuthenticationLayout>
    <FormLogin justify="center" align="center" @wrong-credentials="loginError" />
    <Snackbar :activate="snackbarActivate" :message="message" :status="status" />
  </AuthenticationLayout>
</template>

<script lang="ts">
import AuthenticationLayout from '@/layouts/AuthenticationLayout.vue';
import FormLogin from '@/components/Forms/FormLogin.vue';
import Snackbar from '@/components/BuildingElements/Snackbar.vue';

import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'Login',
  components: {
    AuthenticationLayout,
    FormLogin,
    Snackbar,
  },
  setup() {
    const message = ref('');
    const status = ref('error');
    const snackbarActivate = ref(false);

    const loginError = (): void => {
      console.log('ERRRRRRRRRRRR');
      message.value = 'Authentication Error: Incorrect password or email, please try again.';
      status.value = 'error';
      snackbarActivate.value = true;
      setTimeout(() => {
        snackbarActivate.value = false;
      }, 2000);
    };

    return {
      loginError,
      message,
      status,
      snackbarActivate,
    };
  },
});
</script>
