<template>
  <BasePage>
    <template v-slot:navigation>
      <NavigationBarWeb />
    </template>
    <FormLogin />
  </BasePage>
</template>

<script lang="ts">
import BasePage from '@/layouts/BasePage.vue';
import NavigationBarWeb from '@/components/Navigations/NavigationBarWeb.vue';
import FormLogin from '@/components/Forms/FormLogin.vue';

export default {
  components: {
    BasePage,
    NavigationBarWeb,
    FormLogin,
  },
};
</script>
