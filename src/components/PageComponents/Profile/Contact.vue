<template>
  <v-card color="transparent" flat>
    <v-card-title class="text-sm-h4 black--text">
      Contact
      <EditContact
        v-if="isOwner"
        :location="location"
        :phone-number="phoneNumber"
        :website-url="websiteUrl"
      />
    </v-card-title>
    <v-list color="transparent">
      <v-list-item>
        <v-icon color="black"> mdi-link </v-icon>
        <v-card-text>
          <a v-if="websiteUrl" class="pa-2" :href="'//' + websiteUrl" target="_blank">
            {{ websiteUrl }}
          </a>
          <span v-else-if="!isOwner" class="font-italic">
            Website information not available
          </span>
          <span v-else class="font-italic">
            Add a website link
          </span>
        </v-card-text>
      </v-list-item>

      <v-list-item>
        <v-icon color="black"> mdi-map-marker </v-icon>
        <v-card-text>
          <a v-if="location" class="pa-2" :href="'//' + location" target="_blank">
            {{ location }}
          </a>
          <span v-else-if="!isOwner" class="font-italic">
            Location information not available
          </span>
          <span v-else class="font-italic">
            Add a location link
          </span>
        </v-card-text>
      </v-list-item>

      <v-list-item>
        <v-icon color="black"> mdi-email </v-icon>
        <v-card-text>
          <a class="pa-2" :href="'mailto:' + email">
            {{ email }}
          </a>
        </v-card-text>
      </v-list-item>

      <v-list-item>
        <v-icon color="black"> mdi-cellphone </v-icon>
        <v-card-text class="black--text">
          {{ phoneNumber }}
        </v-card-text>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import EditContact from '@/components/UserActions/EditContact.vue';

import { Contact } from '@/types';

import { computed, defineComponent, toRefs } from '@vue/composition-api';

export default defineComponent({
  name: 'ProfileContact',
  components: {
    EditContact,
  },
  props: {
    isOwner: {
      type: Boolean,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    contact: {
      type: Object as () => Contact,
      required: true,
    },
  },
  setup(props) {
    const { contact } = toRefs(props);

    return {
      location: computed(() => contact.value.location),
      websiteUrl: computed(() => contact.value.websiteUrl),
    };
  },
});
</script>

<style scoped>
.v-card__text {
  word-break: normal;
}
</style>
