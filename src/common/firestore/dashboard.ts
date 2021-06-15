import { EventStatus, SponsorEvents } from '@/types';
import { db } from './utils';
// import { UpdateData } from '../type';

/**
 * Returns an array of all the events belonging to a user
 *
 * @param uid the user's uid
 */
export const getUserEventFromDb = async (uid: string): Promise<SponsorEvents> => {
  const snapshot = await db.events(uid).get();

  const events: SponsorEvents = [];

  snapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());
    events.push(doc.data());
  });

  return events;
};

/**
 * Returns an array of events belonging to a user, filtered by status
 *
 * @param uid the user's uid
 * @param status the status of the events
 */
export const getUserEventByStatusFromDb = async (
  uid: string,
  status: EventStatus,
): Promise<SponsorEvents> => {
  const events: SponsorEvents = [];
  const snapshot = await db
    .events(uid)
    .where('status', '==', status)
    .get();

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

// export const createUserProfileToDb = async (uid: string, userMetadata: Profile): Promise<void> => {
//   const user = await db.profile.doc(uid);

//   await user.set({
//     ...userMetadata,
//   });
// };
