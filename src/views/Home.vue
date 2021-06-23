<template>
  <BasePage>
    <!-- Introduction -->
    <v-container fluid>
      <v-container class="content">
        <v-row align="center">
          <v-col class="px-0" :lg="6">
            <v-card color="transparent" elevation="0">
              <v-card-title class="text-h4 text-lg-h2 font-weight-bold fix white--text">
                We make event partnerships happen
              </v-card-title>
              <v-spacer />
              <v-card-subtitle class="text-body-1 text-lg-h5 white--text">
                Sponsorr! uses machine learning to help event organisers source for partners, so you
                can focus on planning the next big thing on your event itenerary.
              </v-card-subtitle>
              <v-spacer />
              <v-card-actions>
                <v-btn text class="accent1" @click="$vuetify.goTo('#organiser')">
                  For Event Organisers
                </v-btn>
                <v-btn text class="accent2" @click="$vuetify.goTo('#sponsor')">
                  For Sponsors
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col class="px-0" :lg="6">
            <v-img contain src="@/assets/image-introduction.svg" />
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <!-- Event organisers -->
    <v-container fluid class="white">
      <v-container id="organiser" class="content">
        <v-row align="center">
          <v-col class="px-0" :lg="6">
            <v-card color="transparent" elevation="0">
              <v-card-title class="text-lg-h2 font-weight-bold fix accent1--text">
                Event partnerships made easy
              </v-card-title>
              <v-spacer />
              <v-card-subtitle class="text-lg-h5">
                Sponsorr! handles the stress of finding suitable partners and sponsors for your
                event. Just publish your event once, then let our propietary matching algorithm look
                for suitable sponsors.
              </v-card-subtitle>
              <v-spacer />
              <v-card-text class="text-lg-h5"> What else can you do? </v-card-text>
              <v-spacer />
              <v-list color="transparent" flat>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="black"> mdi-clipboard </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="text-lg-h5">
                      Manage multiple events
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="black"> mdi-clock </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="text-lg-h5"> Quickly pitch events </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="black"> mdi-forum </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="text-lg-h5">
                      Communicate with sponsors
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="black"> mdi-chart-line-variant </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="text-lg-h5"> View event analytics </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="black"> mdi-update </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="text-lg-h5">
                      Update sponsorship requests on the fly
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
          <v-col class="px-0" :lg="6">
            <v-img contain src="@/assets/image-howitworks.svg" />
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <!-- Sponsors -->
    <v-container fluid class="secondary">
      <v-container id="sponsor" class="content">
        <v-row align="center">
          <v-col class="px-0" :lg="6">
            <v-img contain src="@/assets/image-benefits.svg" />
          </v-col>
          <v-col class="px-0" :lg="6">
            <v-card color="transparent" elevation="0">
              <v-card-title class="text-lg-h2 font-weight-bold fix accent1--text">
                Marketing + CSR achieved in record time
              </v-card-title>
              <v-spacer />
              <v-card-subtitle class="text-lg-h5 black--text font-weight-bold">
                Use event sponsorships to grow your brand’s recognition.
              </v-card-subtitle>
              <v-card-subtitle class="text-lg-h5">
                Sponsorr! is a platform that matches your business with events that align with your
                brand’s image and values, so you will be able to increase your marketing reach to
                target consumer groups.
              </v-card-subtitle>
              <v-spacer />
              <v-card-text class="text-lg-h5"> What else can you do? </v-card-text>
              <v-spacer />
              <v-list color="transparent" flat>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="black"> mdi-clipboard </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="text-lg-h5">
                      Manage multiple sponsorship requests
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="black"> mdi-chart-line-variant </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="text-lg-h5">
                      Retrieve analytic reports
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="black"> mdi-forum </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="text-lg-h5">
                      Communicate with event organisers
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="black"> mdi-magnify </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="text-lg-h5">
                      Search up events in our catalog
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <!-- Call to action -->
    <v-container fluid class="primary">
      <v-container class="content">
        <v-row align="center">
          <v-col class="px-0" :lg="6">
            <v-card color="transparent" elevation="0">
              <v-card-title class="text-lg-h2 font-weight-bold fix accent1--text">
                Ready?
              </v-card-title>
              <v-card-title class="text-lg-h2 font-weight-bold fix accent1--text">
                Let's make it happen.
              </v-card-title>
            </v-card>
          </v-col>
          <v-col class="px-0" :lg="6">
            <v-img contain src="@/assets/image-teams.svg" />
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </BasePage>
</template>

<script lang="ts">
import BasePage from '@/layouts/BasePage.vue';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Home',
  components: {
    BasePage,
  },
});
</script>

<style scoped>
.content {
  max-width: 1320px;
}
.fix {
  word-break: normal;
}
</style>
