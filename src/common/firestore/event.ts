import { SponsorEvent } from '@/types';
import { UpdateData } from '../type';
import { db } from './utils';

export const getEventFromDb = async (
  uid: string,
  eventId: string,
): Promise<SponsorEvent | undefined> => {
  const event = await db
    .events(uid)
    .doc(eventId)
    .get();

  return event.data();
};

export const updateUserEventFromDb = async (
  uid: string,
  eventId: string,
  newData: Record<string, unknown>,
): Promise<void> => {
  const event = await db.events(uid).doc(eventId);
  const updates: UpdateData<SponsorEvent> = {
    ...newData,
  };

  await event.update(updates);
};
