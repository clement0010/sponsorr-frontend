import { SponsorEvent } from '@/types';
import { UpdateData } from '../type';
import { db } from './utils';

/**
 * Create an event to database and return the event id
 */
export const createEventToDb = async (event: SponsorEvent): Promise<string> => {
  const eventDbItem = await db.events.add(event);

  console.log('Successfully created event.', (await eventDbItem.get()).data(), eventDbItem.id);
  return eventDbItem.id;
};

export const getEventFromDb = async (eventId: string): Promise<SponsorEvent | undefined> => {
  const event = await db.events.doc(eventId).get();

  return event.data();
};

export const updateEventFromDb = async (
  eventId: string,
  newData: Record<string, unknown>,
): Promise<void> => {
  const event = await db.events.doc(eventId);
  const updates: UpdateData<SponsorEvent> = {
    ...newData,
  };

  await event.update(updates);
};

export const deleteEventFromDb = async (eventId: string): Promise<void> => {
  await db.events.doc(eventId).delete();
};
