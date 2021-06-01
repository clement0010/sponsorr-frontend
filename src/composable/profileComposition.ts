import { computed, ref } from '@vue/composition-api';

import { getUserProfileFromDb, updateUserProfileFromDb } from '@/common/firestore/profile';
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
        throw new Error('Failed to fetch user profile data');
      }
      profile.value = userProfile;
      loading.value = false;
      error.value = false;
    } catch (err) {
      console.error(err);
      error.value = true;
    }
  };

  const editUserProfile = async (uid: string, newData: Record<string, unknown>) => {
    try {
      if (!profile.value) {
        console.log('No profile to edit');
        return;
      }
      profile.value = {
        ...profile.value,
        ...newData,
      };
      await updateUserProfileFromDb(uid, newData);

      return;
    } catch (err) {
      throw new Error(err);
    }
  };

  return {
    profile: computed(() => profile.value),
    fetchUserProfile,
    editUserProfile,
    loading,
    error,
  };
}
