<template>
  <v-app-bar class="primary" flat app hide-on-scroll>
    <v-container fill-height class="py-0">
      <v-row align="center" justify="center" class="py-0">
        <v-col cols="auto" class="py-0">
          <v-app-bar-title>
            <router-link to="/">
              <LogoSponsorr :width="175" />
            </router-link>
          </v-app-bar-title>
        </v-col>

        <v-spacer />

        <NavigationDropdown />
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import LogoSponsorr from '@/components/BuildingElements/LogoSponsorr.vue';
import NavigationDropdown from './NavigationDropdown.vue';

export default defineComponent({
  name: 'NavigationBarMobile',
  components: {
    LogoSponsorr,
    NavigationDropdown,
  },
  setup() {
    const logoWidth = 150;

    return {
      logoWidth,
    };
  },
});
</script>

<style scoped>
.btn {
  text-transform: none;
}

.container {
  max-width: 1320px;
}
</style>

function emit(arg0: string, arg1: string) { throw new Error('Function not implemented.'); }
