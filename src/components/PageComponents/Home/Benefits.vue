<template>
  <HomeFrameLayout class="secondary">
    <template v-slot:left-content>
      <v-img contain src="@/assets/frame-3-image.svg"></v-img>
    </template>

    <template v-slot:right-content>
      <v-row>
        <v-container>
          <TextHeading class="secondary accent--text">
            Marketing + CSR achieved in record time
          </TextHeading>
        </v-container>
      </v-row>

      <v-row>
        <v-container>
          <TextContent class="secondary font-weight-bold content--text">
            Use event sponsorships to grow your brand’s recognition.
          </TextContent>
        </v-container>
      </v-row>

      <v-row>
        <v-container>
          <TextContent class="secondary content--text">
            Sponsorr! is a platform that matches your business with events that align with your
            brand’s image and values, so you will be able to increase your marketing reach to
            target consumer groups.
          </TextContent>
        </v-container>
      </v-row>

      <v-row>
        <v-container>
          <TextContent class="secondary content--text">
            What else can you do?
          </TextContent>
        </v-container>

        <v-container>
          <TextList class="secondary">
            <v-list-item v-for="description in descriptions" :key="description">
              <TextContent class="secondary content--text">
                {{ description }}
              </TextContent>
            </v-list-item>
          </TextList>
        </v-container>
      </v-row>
    </template>
  </HomeFrameLayout>
</template>

<script>
import HomeFrameLayout from '@/layouts/HomeFrameLayout.vue';
import TextHeading from '@/components/BuildingElements/TextHeading.vue';
import TextContent from '@/components/BuildingElements/TextContent.vue';
import TextList from '@/components/BuildingElements/TextList.vue';

export default {
  components: {
    HomeFrameLayout,
    TextHeading,
    TextContent,
    TextList,
  },
  setup() {
    const descriptions = [
      'Manage multiple sponsorship requests',
      'Retrieve analytic reports',
      'Communicate with event organisers',
      'Search up events in our catalog',
    ];

    return {
      descriptions,
    };
  },
};
</script>
