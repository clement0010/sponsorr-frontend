<template>
  <BasePage>
    <template v-slot:navigation>
      <NavigationBarWeb />
    </template>
    <FormSignUpOrganiser />
    <FormSignUpSponsor />
  </BasePage>
</template>

<script lang="ts">
import BasePage from '@/layouts/BasePage.vue';
import NavigationBarWeb from '@/components/Navigations/NavigationBarWeb.vue';
import FormSignUpOrganiser from '@/components/Forms/FormSignUpOrganiser.vue';
import FormSignUpSponsor from '@/components/Forms/FormSignUpSponsor.vue';

export default {
  components: {
    BasePage,
    NavigationBarWeb,
    FormSignUpOrganiser,
    FormSignUpSponsor,
  },
};
</script>
