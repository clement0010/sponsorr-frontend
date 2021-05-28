import { Profile } from '@/types';
import { db } from './utils';

export const getUserProfileFromDb = async (uid: string): Promise<Profile | undefined> => {
  const user = await db.profile.doc(uid).get();

  return user.data();
};
