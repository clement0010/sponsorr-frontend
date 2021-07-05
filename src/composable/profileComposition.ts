import Vue from 'vue';
import VueComposistionApi, { computed, ref } from '@vue/composition-api';
import { getUserProfileFromDb, updateUserProfileFromDb } from '@/common/firestore/profile';
import { Profile } from '@/types';

Vue.use(VueComposistionApi);

const userProfile = ref<Profile>();

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useProfile() {
  const loading = ref(false);
  const error = ref(false);

  const fetchUserProfile = async (uid: string) => {
    try {
      loading.value = true;
      userProfile.value = await getUserProfileFromDb(uid);
      if (!userProfile.value) {
        throw new Error('Failed to fetch user profile data');
      }
      error.value = false;
    } catch (err) {
      console.error(err);
      error.value = true;
    } finally {
      loading.value = false;
    }
  };

  const editUserProfile = async (uid: string, newData: Record<string, unknown>) => {
    try {
      if (!userProfile.value) {
        console.log('No profile to edit');
        return;
      }
      userProfile.value = {
        ...userProfile.value,
        ...newData,
      };
      await updateUserProfileFromDb(uid, newData);
      return;
    } catch (err) {
      throw new Error(err);
    }
  };

  return {
    fetchUserProfile,
    editUserProfile,
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    profile: computed(() => userProfile.value),
    role: computed(() => userProfile.value?.role),
    name: computed(() => userProfile.value?.name),
    about: computed(() => userProfile.value?.about),
    displayPicture: computed(() => userProfile.value?.displayPicture),
    keywords: computed(() => userProfile.value?.keywords),
    email: computed(() => userProfile.value?.email),
    phoneNumber: computed(() => userProfile.value?.phoneNumber),
    location: computed(() => userProfile.value?.contact.location),
    websiteUrl: computed(() => userProfile.value?.contact.websiteUrl),
  };
}
// // eslint-disable-next-line
// export default function useProfile() {
//   const loading = ref(true);
//   const error = ref(false);

//   const profile = ref<Profile>();

//   const fetchUserProfile = async (uid: string) => {
//     try {
//       const userProfile = await getUserProfileFromDb(uid);
//       if (!userProfile) {
//         throw new Error('Failed to fetch user profile data');
//       }
//       profile.value = userProfile;
//       loading.value = false;
//       error.value = false;
//     } catch (err) {
//       console.error(err);
//       error.value = true;
//     }
//   };

//   const getRole = async (uid: string): Promise<Role | undefined> => {
//     try {
//       loading.value = true;
//       await fetchUserProfile(uid);
//       if (!profile.value) {
//         throw new Error('Failed to fetch user profile data');
//       }
//       loading.value = false;
//       error.value = false;
//       return profile.value.role;
//     } catch (err) {
//       console.error(err);
//       error.value = true;
//     }
//   };

//   const editUserProfile = async (uid: string, newData: Record<string, unknown>) => {
//     try {
//       if (!profile.value) {
//         console.log('No profile to edit');
//         return;
//       }
//       profile.value = {
//         ...profile.value,
//         ...newData,
//       };
//       await updateUserProfileFromDb(uid, newData);

//       return;
//     } catch (err) {
//       throw new Error(err);
//     }
//   };

//   return {
//     profile: computed(() => profile.value),
//     fetchUserProfile,
//     editUserProfile,
//     getRole,
//     loading,
//     error,
//   };
// }
