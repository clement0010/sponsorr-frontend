<template>
  <HomeFrameLayout class="primary">
    <template v-slot:left-content>
      <v-row>
        <v-container>
          <TextHeading class="accent--text">
            Event partnerships made easy
          </TextHeading>
        </v-container>
      </v-row>

      <v-row>
        <v-container>
          <TextContent>
            Sponsorr! handles the stress of finding suitable partners and sponsors for your event.
            Just publish your event once, then let our propietary matching algorithm look for
            suitable sponsors.
          </TextContent>
        </v-container>
      </v-row>

      <v-row>
        <v-container>
          <TextContent>
            What else can you do?
          </TextContent>
        </v-container>

        <v-container>
          <TextList class="primary">
            <v-list-item v-for="description in descriptions" :key="description">
              <TextContent class="primary">
                {{ description }}
              </TextContent>
            </v-list-item>
          </TextList>
        </v-container>
      </v-row>
    </template>

    <template v-slot:right-content>
      <v-img contain src="@/assets/frame-2-image.svg"></v-img>
    </template>
  </HomeFrameLayout>
</template>

<script>
import HomeFrameLayout from '@/layouts/HomeFrameLayout.vue';
import TextHeading from '@/components/BuildingElements/TextHeading.vue';
import TextContent from '@/components/BuildingElements/TextContent.vue';
import TextList from '@/components/BuildingElements/TextList.vue';

import { defineComponent } from '@vue/composition-api';

const descriptions = [
  'Manage multiple events',
  'Quickly pitch events',
  'Communicate with sponsors',
  'View event analytics',
  'Update sponsorship requests on the fly',
];

export default defineComponent({
  components: {
    HomeFrameLayout,
    TextHeading,
    TextContent,
    TextList,
  },
  data() {
    return {
      descriptions,
    };
  },
});
</script>
