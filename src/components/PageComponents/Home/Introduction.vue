<template>
  <HomeFrameLayout class="primary">
    <template v-slot:left-content>
      <v-row>
        <v-container>
          <TextHeading>
            We make event
            <br />
            partnerships happen
          </TextHeading>
        </v-container>
      </v-row>

      <v-row>
        <v-container>
          <TextContent>
            Sponsorr! uses machine learning to help event organisers source for partners, so you can
            focus on planning the next big thing on your event itenerary.
          </TextContent>
        </v-container>
      </v-row>

      <v-row>
        <v-container>
          <v-row>
            <v-col>
              <v-btn class="accent1" text :ripple="false">
                for event organisers
              </v-btn>
            </v-col>

            <v-col>
              <v-btn class="accent2" text :ripple="false">
                for sponsors
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-row>
    </template>

    <template v-slot:right-content>
      <v-img contain src="@/assets/image-introduction.svg"></v-img>
    </template>
  </HomeFrameLayout>
</template>

<script>
import HomeFrameLayout from '@/layouts/HomeFrameLayout.vue';
import TextHeading from '@/components/BuildingElements/TextHeading.vue';
import TextContent from '@/components/BuildingElements/TextContent.vue';

export default {
  components: {
    HomeFrameLayout,
    TextHeading,
    TextContent,
  },
};
</script>
