import { EventStatus, SponsorEvent, SponsorEventDbItems, SponsorEvents } from '@/types';
import { UpdateData } from '../type';
import { db } from './utils';

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
 * @param uid the user's uid
 * @param status the status of the events
 */
export const getUserEventByStatusFromDb = async (
  uid: string,
  status: EventStatus,
): Promise<SponsorEventDbItems> => {
  const events: SponsorEventDbItems = [];
  const snapshot = await db
    .events(uid)
    .where('status', '==', status)
    .get();

  snapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());

    const event = {
      ...doc.data(),
      eventId: doc.id,
    };

    events.push(event);
  });

  return events;
};

export const updateEventStatusToDb = async (
  uid: string,
  eventId: string,
  status: EventStatus,
  published?: boolean,
): Promise<void> => {
  const updateData: UpdateData<SponsorEvent> = {
    status,
  };
  if (!published) {
    updateData.published = published;
  }

  await db
    .events(uid)
    .doc(eventId)
    .update(updateData);
};

export const deleteEventFromDb = async (uid: string, eventId: string): Promise<void> => {
  await db
    .events(uid)
    .doc(eventId)
    .delete();
};

export const createEventToDb = async (uid: string, event: SponsorEvent): Promise<void> => {
  const eventDbItem = await db.events(uid).add(event);

  console.log('Successfully created event.', (await eventDbItem.get()).data(), eventDbItem.id);
};
