<template>
  <v-dialog v-model="dialog" light width="unset" :fullscreen="$vuetify.breakpoint.xsOnly">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="text-lowercase font-weight-regular white--text"
        color="transparent"
        rounded
        text
        v-bind="attrs"
        v-on="on"
        :ripple="false"
      >
        login
      </v-btn>
    </template>

    <v-card width="auto">
      <v-card-title>
        login as
      </v-card-title>
      <v-card-actions>
        <v-btn class="accent1">
          <span class="white--text">Event Organiser</span>
        </v-btn>
        <v-btn class="accent2">
          <span class="white--text">Sponsor</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
