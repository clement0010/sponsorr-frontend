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

export default {
  components: {
    AuthenticationLayout,
    FormLogin,
  },
};
</script>
