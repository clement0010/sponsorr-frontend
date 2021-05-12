<template>
  <BasePage>
    <FormLogin />
  </BasePage>
</template>

<script lang="ts">
import BasePage from '@/layouts/BasePage.vue';
import FormLogin from '@/components/Forms/FormLogin.vue';

const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const email = (value: string) => pattern.test(value) || 'Invalid email';
const required = (value: unknown) => !!value || 'Required';

export default {
  components: {
    BasePage,
    FormLogin,
  },
  data() {
    return {
      rules: {
        email,
        required,
      },
    };
  },
};
</script>
