<template>
  <AuthenticationLayout>
    <FormLogin
      justify="center"
      align="center"
    />
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
});
</script>
