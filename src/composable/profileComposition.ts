import { computed, ref } from '@vue/composition-api';

import { getUserProfileFromDb } from '@/common/firestore/profile';
import { Profile } from '@/types';

// eslint-disable-next-line
export default function useProfile() {
  const loading = ref(true);
  const error = ref(false);

  const profile = ref<Profile>();

  const fetchUserProfile = async (uid: string) => {
    try {
      const userProfile = await getUserProfileFromDb(uid);
      if (!userProfile) {
        console.log('Failed to fetch user profile data');
        return;
      }
      profile.value = userProfile;
      loading.value = false;
      error.value = false;
    } catch (err) {
      console.error(err);
      error.value = true;
    }
  };

  const editUserProfile = async (editedProfile: Profile) => {
    profile.value = editedProfile;
  };

  return {
    profile: computed(() => {
      console.log('updated');
      return profile.value;
    }),
    fetchUserProfile,
    editUserProfile,
    loading,
    error,
  };
}
