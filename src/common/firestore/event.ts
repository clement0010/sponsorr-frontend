import { SponsorEvent } from '@/types';
import { db } from './utils';

export const getEventFromDb = async (
  uid: string,
  eventID: string,
): Promise<SponsorEvent | undefined> => {
  const event = await db
    .events(uid)
    .doc(eventID)
    .get();

  return event.data();
};
