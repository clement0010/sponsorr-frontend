import { Messages, SponsorEventDbItems } from '@/types';
import { parseUserEventId } from '..';
import { db } from './utils';

/**
 * Return all the events
 *
 */
export const getEventsFromDb = async (keywords?: string): Promise<SponsorEventDbItems> => {
  let snapshot;
  if (keywords) {
    // Ignore this we do frontend search for now
    snapshot = await db.events.where('keywords', 'array-contains', keywords).get();
  }
  if (!keywords) {
    snapshot = await db.events.get();
  }

  const events: SponsorEventDbItems = [];

  snapshot?.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());

    const event = {
      ...doc.data(),
      eventId: doc.id,
    };

    events.push(event);
  });
  return events;
};

export const applyEventToDb = async (
  eventId: string,
  userId: string,
  messages?: Messages,
): Promise<void> => {
  const matchMessages = messages || [
    {
      message: 'Hello',
      timestamp: new Date().getTime(),
    },
  ];

  await db.matches.doc(parseUserEventId(userId, eventId)).set({
    eventId,
    userId,
    messages: matchMessages,
    status: 'pending',
  });
};
