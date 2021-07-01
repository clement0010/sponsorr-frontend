import useProfile from '@/composable/profileComposition';
import { Match, Matches, MatchStatus, Message, Role, SponsorEvent } from '@/types';
import { UpdateData } from '../type';
import { getEventFromDb } from './event';
import { db } from './utils';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getAllMatchedEventFromDb = async (
  userId: string,
  role?: Role,
  status?: MatchStatus,
): Promise<Matches> => {
  let matches;
  if (role && status) {
    // ToDo: Extend this part
    // const roleStatus = role === 'Sponsor' ? 'sponsorStatus' : 'organiserStatus';
    matches = await db.matches
      .where('userId', '==', userId)
      .where('status', '==', status)
      .get();
  }
  if (!role && status) {
    matches = await db.matches
      .where('userId', '==', userId)
      .where('status', '==', status)
      .get();
  }

  if (!role && !status) {
    matches = await db.matches.where('userId', '==', userId).get();
  }

  const matchedEvents: Matches = [];
  const filteredMatches = matches?.docs.filter((doc) => doc.exists) || [];

  // eslint-disable-next-line no-restricted-syntax
  for (const match of filteredMatches) {
    // eslint-disable-next-line no-await-in-loop
    const event = await getEventFromDb(match.data().eventId);

    if (!event) break;
    const matchedEvent: Match = {
      event,
      ...match.data(),
    };
    matchedEvents.push(matchedEvent);
  }

  return matchedEvents;
};

export const getMatchesByEventId = async (
  userEventId: string,
  userEvent: SponsorEvent | undefined,
): Promise<Matches> => {
  const dbMatches = await db.matches.where('eventId', '==', userEventId).get();
  const matches: Matches = [];
  const filteredMatches = dbMatches?.docs.filter((doc) => doc.exists) || [];
  const { fetchUserProfile, profile } = useProfile();

  // eslint-disable-next-line no-restricted-syntax
  for (const match of filteredMatches) {
    if (!userEvent) break;
    const normalisedMatch: Match = {
      event: userEvent,
      ...match.data(),
    };
    // eslint-disable-next-line no-await-in-loop
    await fetchUserProfile(normalisedMatch.userId);
    const name = { name: profile.value?.name };
    Object.assign(normalisedMatch, name);
    matches.push(normalisedMatch);
  }

  return matches;
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

  if (message) {
    updateData.messages = [message];
  }

  await event.update(updateData);
};
