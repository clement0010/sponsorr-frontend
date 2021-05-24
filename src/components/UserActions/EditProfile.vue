<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="mx-5" v-bind="attrs" v-on="on" icon>
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
              label="Enter Image URL"
              outlined
              v-model="profileTemplate.picture"
              :rules="[validURLRule]"
            />
          </v-card-text>
        </v-container>

        <v-container v-show="attribute === 'about'">
          <v-card-title>
            Edit About
          </v-card-title>
          <v-card-text>
            <v-textarea label="About" outlined v-model="profileTemplate.about" />
          </v-card-text>
        </v-container>

        <v-container v-show="attribute === 'keywords'">
          <v-card-title>
            Edit Keywords
          </v-card-title>
          <v-card-text>
            <v-chip-group column class="px-4">
              <v-chip
                close
                v-for="keyword in profileTemplate.keywords"
                :key="keyword"
                @click:close="removeKeyword(keyword)"
              >
                {{ keyword }}
              </v-chip>
            </v-chip-group>

            <v-text-field
              class="px-4"
              dense
              outlined
              label="Type here and hit 'enter' to save"
              v-model="keywordInput"
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
                label="Link to Website"
                outlined
                v-model="profileTemplate.link"
                :rules="[validURLRule]"
              />
              <v-text-field
                label="Link to Google Maps"
                outlined
                v-model="profileTemplate.location"
                :rules="[validURLRule]"
              />
              <v-text-field
                label="Email Address"
                outlined
                v-model="profileTemplate.email"
                :rules="[validEmailRule]"
              />
              <v-text-field
                label="Phone Number"
                outlined
                v-model="profileTemplate.phone"
              />
            </v-container>
          </v-card-text>
        </v-container>

        <v-card-actions>
          <v-spacer />
          <v-btn class="error" @click="cancel">
            Cancel
          </v-btn>
          <v-btn class="success" @click="save" :disabled="!valid">
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
      link: profile.value.link,
      location: profile.value.location,
      email: profile.value.email,
      phone: profile.value.phone,
      keywords: JSON.parse(JSON.stringify(profile.value.keywords)),
      picture: profile.value.picture,
    });

    const cancel = (): void => {
      dialog.value = false;
      profileTemplate.about = profile.value.about;
      profileTemplate.link = profile.value.link;
      profileTemplate.location = profile.value.location;
      profileTemplate.email = profile.value.email;
      profileTemplate.phone = profile.value.phone;
      profileTemplate.keywords = JSON.parse(JSON.stringify(profile.value.keywords));
      profileTemplate.picture = profile.value.picture;
    };

    const save = (): void => {
      dialog.value = false;
      profile.value.about = profileTemplate.about;
      profile.value.link = profileTemplate.link;
      profile.value.location = profileTemplate.location;
      profile.value.email = profileTemplate.email;
      profile.value.phone = profileTemplate.phone;
      profile.value.keywords = JSON.parse(JSON.stringify(profileTemplate.keywords));
      profile.value.picture = profileTemplate.picture;
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
