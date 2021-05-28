<template>
  <v-dialog
    v-model="dialog"
    max-width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="mx-5"
        v-bind="attrs"
        icon
        v-on="on"
      >
        <v-icon color="black">
          mdi-pencil
        </v-icon>
      </v-btn>
    </template>

    <v-card light>
      <v-form v-model="valid">
        <v-container v-show="attribute === 'displayPicture'">
          <v-card-title>
            Edit Display Picture
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="profileTemplate.displayPicture"
              label="Enter Image URL"
              outlined
              :rules="[validURLRule]"
            />
          </v-card-text>
        </v-container>

        <v-container v-show="attribute === 'about'">
          <v-card-title>
            Edit About
          </v-card-title>
          <v-card-text>
            <v-textarea
              v-model="profileTemplate.about"
              label="About"
              outlined
            />
          </v-card-text>
        </v-container>

        <v-container v-show="attribute === 'keywords'">
          <v-card-title>
            Edit Keywords
          </v-card-title>
          <v-card-text>
            <v-chip-group
              column
              class="px-4"
            >
              <v-chip
                v-for="keyword in profileTemplate.keywords"
                :key="keyword"
                close
                @click:close="removeKeyword(keyword)"
              >
                {{ keyword }}
              </v-chip>
            </v-chip-group>

            <v-text-field
              v-model="keywordInput"
              class="px-4"
              dense
              outlined
              label="Type here and hit 'enter' to save"
              @keydown.enter="addKeyword"
            />
          </v-card-text>
        </v-container>

        <v-container v-show="attribute === 'contact'">
          <v-card-title>
            Edit Contact
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-text-field
                v-model="profileTemplate.websiteURL"
                label="Link to Website"
                outlined
                :rules="[validURLRule]"
              />
              <v-text-field
                v-model="profileTemplate.location"
                label="Link to Google Maps"
                outlined
                :rules="[validURLRule]"
              />
              <v-text-field
                v-model="profileTemplate.contactEmail"
                label="Email Address"
                outlined
                :rules="[validEmailRule]"
              />
              <v-text-field
                v-model="profileTemplate.contactPhone"
                label="Phone Number"
                outlined
              />
            </v-container>
          </v-card-text>
        </v-container>

        <v-card-actions>
          <v-spacer />
          <v-btn
            class="error"
            @click="cancel"
          >
            Cancel
          </v-btn>
          <v-btn
            class="success"
            :disabled="!valid"
            @click="save"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { validEmailRule, validURLRule } from '@/utils/validation';
import { Profile } from '@/types';
import {
  defineComponent, reactive, ref, toRefs,
} from '@vue/composition-api';

export default defineComponent({
  props: {
    profile: {
      type: Object as () => Profile,
      required: true,
    },
    attribute: {
      type: String,
      required: true,
      enum: ['about', 'contact', 'keywords', 'displayPicture'],
    },
  },
  setup(props) {
    const dialog = ref(false);

    const configuration = reactive({
      valid: true,
    });

    const { profile } = toRefs(props);

    const profileTemplate = reactive({
      about: profile.value.about,
      contactPhone: profile.value.contact.contactPhone,
      displayPicture: profile.value.displayPicture,
      contactEmail: profile.value.contact.contactEmail,
      keywords: JSON.parse(JSON.stringify(profile.value.keywords)),
      location: profile.value.contact.location,
      websiteURL: profile.value.contact.websiteURL,
    });

    const cancel = (): void => {
      dialog.value = false;
      profileTemplate.about = profile.value.about;
      profileTemplate.contactPhone = profile.value.contact.contactPhone;
      profileTemplate.displayPicture = profile.value.displayPicture;
      profileTemplate.contactEmail = profile.value.contact.contactEmail;
      profileTemplate.keywords = JSON.parse(JSON.stringify(profile.value.keywords));
      profileTemplate.location = profile.value.contact.location;
      profileTemplate.websiteURL = profile.value.contact.websiteURL;
    };

    const save = (): void => {
      dialog.value = false;
      profile.value.about = profileTemplate.about;
      profile.value.contact.contactEmail = profileTemplate.contactEmail;
      profile.value.contact.contactPhone = profileTemplate.contactPhone;
      profile.value.contact.location = profileTemplate.location;
      profile.value.contact.websiteURL = profileTemplate.websiteURL;
      profile.value.displayPicture = profileTemplate.displayPicture;
      profile.value.keywords = JSON.parse(JSON.stringify(profileTemplate.keywords));
    };

    const keywordInput = ref('');

    const removeKeyword = (keyword: string): void => {
      for (let i = 0; i < profileTemplate.keywords.length; i += 1) {
        if (profileTemplate.keywords[i] === keyword) {
          profileTemplate.keywords.splice(i, 1);
          break;
        }
      }
    };

    const addKeyword = (): void => {
      profileTemplate.keywords.push(keywordInput.value);
      keywordInput.value = '';
    };

    return {
      dialog,
      cancel,
      save,
      profileTemplate,
      validEmailRule,
      validURLRule,
      removeKeyword,
      keywordInput,
      addKeyword,
      ...configuration,
    };
  },
});
</script>
