import { reactive, toRefs } from '@vue/composition-api';
import { Contact, Profile } from '@/types';

export default function useProfile() {
  const profile = reactive<Profile>({
    id: '01',
    name: 'The FooBar Society',
    email: 'marketing@foobar.org.sg',
    about: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    phoneNumber: '+65 12345678',
    displayPicture: 'https://randomuser.me/api/portraits/med/men/31.jpg',
    role: 'EventOrganiser',
    keywords: [
      'National University of Singapore',
      'College/University',
      'Women',
      'Sports',
      'Charity',
      'Health',
    ],
    contact: reactive<Contact>({
      contactEmail: 'marketing@foobar.org.sg',
      contactPhone: '+65 12345678',
      location: 'https://maps.google.com.sg/',
      websiteURL: 'https://vuejs.org/v2/guide/components-props.html',
    }),
  });
  return {
    ...toRefs(profile),
    ...toRefs(profile.contact),
    profile,
  };
}
