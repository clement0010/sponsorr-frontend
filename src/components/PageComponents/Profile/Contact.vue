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
    <v-container>
      <v-row>
        <v-col>
          <v-icon color="black">
            mdi-link
          </v-icon>
          <slot name="link"></slot>
        </v-col>
        <v-col>
          <v-icon color="black">
            mdi-map-marker
          </v-icon>
          <slot name="location"></slot>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-icon color="black">
            mdi-email
          </v-icon>
          <slot name="email"></slot>
        </v-col>
        <v-col>
          <v-icon color="black">
            mdi-cellphone
          </v-icon>
          <slot name="phone"></slot>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
