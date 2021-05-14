<template>
  <v-card class="black--text" color="transparent" flat width="75%">
    <v-row align="center">
      <v-col cols="4">
        <slot name="profile"></slot>
      </v-col>
      <v-col>
        <v-card-title class="text-h2" flat>
          <slot name="name"></slot>
        </v-card-title>
        <v-card-text class="black--text">
          organiser ID:
          <slot name="ID"></slot>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>
