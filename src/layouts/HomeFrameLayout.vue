<template>
  <v-container class="px-12" fluid style="height: 100%;">
    <v-row>
      <v-col>
        <slot name="left-content"></slot>
      </v-col>
      <v-col>
        <slot name="right-content"></slot>
      </v-col>
    </v-row>
  </v-container>
</template>
