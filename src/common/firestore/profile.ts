import { Profile } from '@/types';
import { UpdateData } from '../type';
import { db } from './utils';

export const getUserProfileFromDb = async (uid: string): Promise<Profile | undefined> => {
  const user = await db.profile.doc(uid).get();

  return user.data();
};

export const updateUserProfileFromDb = async (
  uid: string,
  newData: Record<string, unknown>,
): Promise<void> => {
  const user = await db.profile.doc(uid);
  const updates: UpdateData<Profile> = {
    ...newData,
  };

  await user.update(updates);
};
