<template>
  <v-footer absolute light>
    <v-container fill-height>
      <v-row align="center" justify="center">
        <v-col cols="auto">
          NUS Orbital 2021
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          &copy; {{ new Date().getFullYear() }} Sponsorr!
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-btn class="mx-4" light icon>
            <v-icon size="30px" color="black">
              mdi-github
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style scoped>
.container {
  max-width: 1320px;
}
</style>
