<template>
  <HomeFrameLayout class="primary">
    <template v-slot:left-content>
      <v-container>
        <TextHeading>
          Ready?
        </TextHeading>
        <router-link to="/signup">
          <TextHeading class="accent3--text text-decoration-underline">
            Let's make it happen.
          </TextHeading>
        </router-link>
      </v-container>
    </template>

    <template v-slot:right-content>
      <v-img contain src="@/assets/frame-4-image.svg"></v-img>
    </template>
  </HomeFrameLayout>
</template>

<script>
import HomeFrameLayout from '@/layouts/HomeFrameLayout.vue';
import TextHeading from '@/components/BuildingElements/TextHeading.vue';

export default {
  components: {
    HomeFrameLayout,
    TextHeading,
  },
};
</script>
