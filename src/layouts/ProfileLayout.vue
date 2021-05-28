<template>
  <v-container
    class="secondary"
    fluid
  >
    <v-row justify="center">
      <v-card
        max-width="1320px"
        color="transparent"
        class="my-16"
        flat
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            align="center"
            justify="center"
            cols="auto"
          >
            <DisplayPicture :url-pic="profile.displayPicture" />
            <!-- <EditProfile
                :profile="profile"
                :attribute="'displayPicture'"
              /> -->
          </v-col>
          <v-col>
            <Title :name="profile.name" />
            <IdentificationNumber :id="profile.uen" />
          </v-col>
        </v-row>

        <v-row>
          <v-card
            color="transparent"
            flat
          >
            <v-card-title class="text-h4 black--text">
              About
              <!-- <EditProfile
                  :profile="profile"
                  :attribute="'about'"
                /> -->
            </v-card-title>
            <About :about="profile.about" />
          </v-card>
        </v-row>

        <v-row>
          <v-card
            color="transparent"
            flat
          >
            <v-card-title class="text-h4 black--text">
              Keywords
              <!-- <EditProfile
                  :profile="profile"
                  :attribute="'keywords'"
                /> -->
            </v-card-title>
            <Keywords :keywords="profile.keywords" />
          </v-card>
        </v-row>

        <v-row>
          <v-card
            color="transparent"
            flat
          >
            <v-card-title class="text-h4 black--text">
              Contact
              <!-- <EditProfile
                  :profile="profile"
                  :attribute="'contact'"
                /> -->
            </v-card-title>
            <Contact
              :email="profile.email"
              :contact="profile.contact"
              :phone-number="profile.phoneNumber"
            />
          </v-card>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import About from '@/components/PageComponents/Profile/About.vue';
import Contact from '@/components/PageComponents/Profile/Contact.vue';
import DisplayPicture from '@/components/PageComponents/Profile/DisplayPicture.vue';
import IdentificationNumber from '@/components/PageComponents/Profile/IdentificationNumber.vue';
import Keywords from '@/components/PageComponents/Profile/Keywords.vue';
import Title from '@/components/PageComponents/Profile/Title.vue';

import { Profile } from '@/types';

import { defineComponent, toRefs } from '@vue/composition-api';

export default defineComponent({
  name: 'ProfileLayout',
  props: {
    profile: {
      type: Object as () => Profile,
      required: true,
    },
  },
  components: {
    About,
    Contact,
    DisplayPicture,
    IdentificationNumber,
    Keywords,
    Title,
  },
  setup(props) {
    const { profile } = toRefs(props);
    const edit = () => {
      profile.value.about = '12345';
    };

    return {
      edit,
    };
  },
});
</script>
