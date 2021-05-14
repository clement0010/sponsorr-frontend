<template>
  <v-container class="pa-0" fluid>
    <NavigationBarWeb />

    <!-- section 1 -->
    <v-container class="primary" fluid>
      <v-row class="px-14 my-10">
        <v-col class="pa-0">
          <v-card color="transparent" flat max-width="575">
            <span class="text-h2 font-weight-black">
              We make event partnerships happen
            </span>
            <v-card-subtitle class="text-h5 px-0 my-10">
              Sponsorr! uses machine learning to help event organisers source for partners, so you
              can focus on planning the next big thing on your event itenerary.
            </v-card-subtitle>
            <v-card-actions class="px-0">
              <v-btn class="accent1" rounded @click="$vuetify.goTo('#how-it-works')">
                For Event Organisers
              </v-btn>
              <v-btn color="accent2" rounded @click="$vuetify.goTo('#how-it-works')">
                For Sponsors
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col class="pa-0" cols="auto">
          <v-img contain max-width="500" src="@/assets/image-introduction.svg" />
        </v-col>
      </v-row>
    </v-container>

    <!-- section 2 -->
    <v-container class="white" fluid id="how-it-works">
      <v-row class="px-14 my-10">
        <v-col class="pa-0">
          <v-card color="transparent" flat max-width="575">
            <span class="text-h2 font-weight-black black--text">
              Event partnerships made easy
            </span>
            <v-card-subtitle class="text-h5 px-0 my-10 black--text">
              Sponsorr! handles the stress of finding suitable partners and sponsors for your event.
              Just publish your event once, then let our propietary matching algorithm look for
              suitable sponsors.
            </v-card-subtitle>
            <v-card-subtitle class="text-h5 px-0 my-10 black--text">
              What else can you do?
            </v-card-subtitle>
            <v-list color="transparent">
              <v-list-item class="text-h5">
                <span class="black--text">
                  Manage multiple events
                </span>
              </v-list-item>
              <v-list-item class="text-h5">
                <span class="black--text">
                  Quickly pitch events
                </span>
              </v-list-item>
              <v-list-item class="text-h5">
                <span class="black--text">
                  Communicate with sponsors
                </span>
              </v-list-item>
              <v-list-item class="text-h5">
                <span class="black--text">
                  View event analytics
                </span>
              </v-list-item>
              <v-list-item class="text-h5">
                <span class="black--text">
                  Update sponsorship requests on the fly
                </span>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col class="pa-0" cols="auto" align-self="center">
          <v-img contain max-width="500" src="@/assets/image-howitworks.svg" />
        </v-col>
      </v-row>
    </v-container>

    <!-- section 4 -->
    <v-container class="primary" fluid>
      <v-row class="px-14 my-10">
        <v-col class="pa-0" align-self="center">
          <v-card color="transparent" flat max-width="575">
            <span class="text-h2 font-weight-black">
              Ready?
              <br />
              <router-link to="/signup">
                <span class="white--text">
                  Let's make it happen.
                </span>
              </router-link>
            </span>
          </v-card>
        </v-col>
        <v-col class="pa-0" cols="auto">
          <v-img contain max-width="500" src="@/assets/image-teams.svg" />
        </v-col>
      </v-row>
    </v-container>
    <Footer />
  </v-container>
</template>

<script lang="ts">
import NavigationBarWeb from '@/components/Navigations/NavigationBarWeb.vue';
import Footer from '@/components/PageComponents/Footer.vue';

export default {
  components: {
    NavigationBarWeb,
    Footer,
  },
};
</script>
