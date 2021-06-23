import { Match, Matches, MatchStatus, Message } from '@/types';
import { UpdateData } from '../type';
import { getEventFromDb } from './event';
import { db } from './utils';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getAllMatchedEventFromDb = async (
  userId: string,
  status?: MatchStatus,
): Promise<Matches> => {
  let matches;
  if (!status) {
    matches = await db.matches
      .where('userId', '==', userId)
      .where('status', '==', status)
      .get();
  }
  matches = await db.matches.where('userId', '==', userId).get();

  const matchedEvents: Matches = [];
  matches.docs
    .filter((doc) => doc.exists)
    .forEach(async (doc) => {
      const event = await getEventFromDb(doc.data().eventId);
      if (!event) return;
      const matchedEvent: Match = {
        event,
        ...doc.data(),
      };
      matchedEvents.push(matchedEvent);
    });

  return matchedEvents;
};

export const updateMatchedEventStatusFromDb = async (
  userEventId: string,
  status: MatchStatus,
  message?: Message,
): Promise<void> => {
  const event = await db.matches.doc(userEventId);
  const updateData: UpdateData<Match> = {
    status,
  };

  if (!message) {
    updateData.messages = message;
  }

  await event.update(updateData);
};
