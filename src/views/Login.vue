<template>
  <AuthenticationLayout>
    <FormLogin justify="center" align="center" @alert="alert" @success="success" />
  </AuthenticationLayout>
</template>

<script lang="ts">
import AuthenticationLayout from '@/layouts/AuthenticationLayout.vue';
import FormLogin from '@/components/Forms/FormLogin.vue';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Login',
  components: {
    AuthenticationLayout,
    FormLogin,
  },
  setup(_, { emit }) {
    const alert = (message: string) => {
      emit('alert', message);
    };

    const success = (message: string) => {
      emit('success', message);
    };

    return { alert, success };
  },
});
</script>
