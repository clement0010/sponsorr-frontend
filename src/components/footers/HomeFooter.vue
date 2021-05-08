<template>
  <v-footer padless>
    <v-card
      flat
      tile
      width="100%"
      class="white lighten-1 text-center"
    >
      <v-card-text class="black--text">
        <v-btn icon>
          <v-icon color="black" size="50px">
            mdi-github
          </v-icon>
        </v-btn>
        &copy; {{ new Date().getFullYear() }} <strong>Sponsorr!</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
