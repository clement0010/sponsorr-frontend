import { EventStatus, SponsorEvent, SponsorEventDbItems, SponsorEvents } from '@/types';
import { UpdateData } from '../type';
import { db } from './utils';

/**
 * Returns an array of all the events belonging to a user
 *
 */
export const getUserEventFromDb = async (uid: string): Promise<SponsorEvents> => {
  const snapshot = await db.events.where('userId', '==', uid).get();

  const events: SponsorEvents = [];

  snapshot.forEach((doc) => {
    const event = {
      ...doc.data(),
      eventId: doc.id,
    };

    events.push(event);
  });
  return events;
};

/**
 * Returns an array of events belonging to a user, filtered by status
 *
 */
export const getUserEventByStatusFromDb = async (
  uid: string,
  status: EventStatus,
): Promise<SponsorEventDbItems> => {
  const events: SponsorEventDbItems = [];
  const snapshot = await db.events
    .where('userId', '==', uid)
    .where('status', '==', status)
    .get();

  snapshot.forEach((doc) => {
    const event = {
      ...doc.data(),
      eventId: doc.id,
    };
    events.push(event);
  });

  return events;
};

export const updateEventStatusToDb = async (
  eventId: string,
  status: EventStatus,
  subscribed?: boolean,
): Promise<void> => {
  const updateData: UpdateData<SponsorEvent> = {
    status,
  };
  if (subscribed !== undefined) {
    updateData.subscribed = subscribed;
  }

  await db.events.doc(eventId).update(updateData);
};
