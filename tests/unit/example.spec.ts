// Imports
import Vuetify from 'vuetify';

// Utilities
import { createLocalVue, mount } from '@vue/test-utils';

describe('AppBtn.vue', () => {
  // DO NOT use Vuetify on the localInstance
  // This is bootstrapped in the jest setup
  // file located in ./tests/setup.js
  //
  // localVue.use(Vuetify)

  const localVue = createLocalVue();
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('should work', () => {
    //
  });
});
