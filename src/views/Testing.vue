<template>
  <BasePage>
    <v-row justify="center">
      <v-col>
        <FormSignUpOrganiser />
      </v-col>
    </v-row>
  </BasePage>
</template>

<script lang="ts">
import BasePage from '@/layouts/BasePage.vue';
import FormSignUpOrganiser from '@/components/Forms/FormSignUpOrganiser.vue';

export default {
  components: {
    BasePage,
    // LogoSponsorr,
    FormSignUpOrganiser,
  },
};
</script>
