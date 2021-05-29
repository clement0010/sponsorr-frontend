<template>
  <BasePage>
    <v-card
      class="rounded-0"
      color="white"
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-card
          color="transparent"
          flat
          width="50%"
        >
          <v-card-title>
            <v-row align="center">
              <v-col
                class="d-flex justify-center"
                order="first"
                cols="auto"
              >
                <DisplayPicture :url-pic="picture" />
                <EditProfile
                  :profile="profile"
                  :attribute="'displayPicture'"
                />
              </v-col>

              <v-col order="last">
                <Title :name="name" />
                <IdentificationNumber :id="id" />
              </v-col>
            </v-row>
          </v-card-title>
        </v-card>
      </v-row>

      <v-row justify="center">
        <v-card
          color="transparent"
          flat
          width="50%"
        >
          <v-card-title class="text-h4 black--text">
            About <EditProfile
              :profile="profile"
              :attribute="'about'"
            />
          </v-card-title>
          <About :about="about" />
        </v-card>
      </v-row>

      <v-row justify="center">
        <v-card
          color="transparent"
          flat
          width="50%"
        >
          <v-card-title class="text-h4 black--text">
            Keywords <EditProfile
              :profile="profile"
              :attribute="'keywords'"
            />
          </v-card-title>
          <Keywords :keywords="keywords" />
        </v-card>
      </v-row>

      <v-row justify="center">
        <v-card
          color="transparent"
          flat
          width="50%"
        >
          <v-card-title class="text-h4 black--text">
            Contact <EditProfile
              :profile="profile"
              :attribute="'contact'"
            />
          </v-card-title>
          <Contact
            :email="email"
            :link="link"
            :location="location"
            :phone="phone"
          />
        </v-card>
      </v-row>
    </v-card>
  </BasePage>
</template>

<script lang="ts">
import About from '@/components/PageComponents/Profile/About.vue';
import BasePage from '@/layouts/BasePage.vue';
import Contact from '@/components/PageComponents/Profile/Contact.vue';
import DisplayPicture from '@/components/PageComponents/Profile/DisplayPicture.vue';
import EditProfile from '@/components/UserActions/EditProfile.vue';
import IdentificationNumber from '@/components/PageComponents/Profile/IdentificationNumber.vue';
import Keywords from '@/components/PageComponents/Profile/Keywords.vue';
import Title from '@/components/PageComponents/Profile/Title.vue';

import useProfile from '@/composable/profileComposition';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Profile',
  components: {
    About,
    BasePage,
    Contact,
    DisplayPicture,
    EditProfile,
    IdentificationNumber,
    Keywords,
    Title,
  },
  setup() {
    const {
      about, picture, name, id, profile, email, link, location, phone, keywords,
    } = useProfile();
    return {
      about, picture, name, id, profile, email, link, location, phone, keywords,
    };
  },
});
</script>
