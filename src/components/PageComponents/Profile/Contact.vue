<template>
  <v-card class="black--text" color="transparent" flat width="75%">
    <v-card-title class="text-h4">
      Contact
      <v-btn icon>
        <v-icon color="black">
          mdi-pencil
        </v-icon>
      </v-btn>
    </v-card-title>
    <v-container class="black--text">
      <v-row>
        <v-col>
          <v-icon color="black">
            mdi-link
          </v-icon>
          {{ link }}
        </v-col>
        <v-col>
          <v-icon color="black">
            mdi-map-marker
          </v-icon>
          {{ location }}
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-icon color="black">
            mdi-email
          </v-icon>
          {{ email }}
        </v-col>
        <v-col>
          <v-icon color="black">
            mdi-cellphone
          </v-icon>
          {{ phone }}
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
export default {
  props: ['link', 'location', 'email', 'phone'],
};
</script>
