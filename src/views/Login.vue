<template>
  <AuthenticationLayout>
    <FormLogin
      justify="center"
      align="center"
      @alert="(payload) => $emit('alert', payload)"
      @success="(payload) => $emit('success', payload)"
    />
  </AuthenticationLayout>
</template>

<script lang="ts">
import AuthenticationLayout from '@/layouts/AuthenticationLayout.vue';
import FormLogin from '@/components/Forms/Authentication/FormLogin.vue';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Login',
  components: {
    AuthenticationLayout,
    FormLogin,
  },
});
</script>
