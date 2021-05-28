import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

const opts = {
  theme: {
    themes: {
      dark: {
        anchor: '#1B1852',
        primary: '#1B1852',
        secondary: '#E4E4E4',
        accent1: '#FF9131',
        accent2: '#0059A3',
        accent3: '#FFC981',
        white: '#FFFFFF',
        balck: '#000000',
        // Config here
        // primary: '#1976D2',
        // secondary: '#424242',
        // accent: '#82B1FF',
        error: '#FF5252',
        // info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
    dark: true,
  },
};

export default new Vuetify(opts);
