import { EventStatus, SponsorEvents } from '@/types';
// import { UpdateData } from '../type';
import { db } from './utils';

// export const createUserProfileToDb = async (uid: string, userMetadata: Profile): Promise<void> => {
//   const user = await db.profile.doc(uid);

//   await user.set({
//     ...userMetadata,
//   });
// };

export const getUserEventFromDb = async (uid: string): Promise<SponsorEvents> => {
  const snapshot = await db.events(uid).get();

  const events: SponsorEvents = [];

  snapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());
    events.push(doc.data());
  });

  return events;
};

export const getUserEventByStatusFromDb = async (
  uid: string,
  status: EventStatus,
): Promise<SponsorEvents> => {
  const snapshot = await db
    .events(uid)
    .where('status', '==', status)
    .get();

  const events: SponsorEvents = [];

  snapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());
    events.push(doc.data());
  });

  return events;
};

// export const updateUserProfileFromDb = async (
//   uid: string,
//   newData: Record<string, unknown>,
// ): Promise<void> => {
//   const user = await db.profile.doc(uid);
//   const updates: UpdateData<Profile> = {
//     ...newData,
//   };

//   await user.update(updates);
// };
