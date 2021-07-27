import Fuse from 'fuse.js';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {
  EventSummary,
  HelperText,
  Match,
  Matches,
  MatchStatus,
  MatchSummary,
  SponsorEvents,
} from '@/types';
import { EventAnalytics, MatchGroup } from '@/types/enum';

dayjs.extend(customParseFormat);

/**
 * Generates date as string, with option to pass date as ISO8601, unix timestamp, and format
 *
 * @param dateOrUnixTime the supplied date (eg IS08601, YYYY-MM-DD) as string or unix time
 * @param format the user specified format. Default is DD/MM/YYYY
 * @returns the date with the specified format according to the arguments, or todays date in DD/MM/YYYY if no arguments supplied.
 */
export const generateDate = (dateOrUnixTime?: string | number, format?: string): string => {
  const formatter: string = format || 'DD/MM/YYYY';

  if (!dateOrUnixTime) {
    // Return today's date
    return dayjs().format(formatter);
  }

  if (typeof dateOrUnixTime === 'number') {
    return dayjs.unix(dateOrUnixTime).format(formatter);
  }

  return dayjs(dateOrUnixTime).format(formatter);
};

/**
 * Generate a unix timestamp, with option to pass date as string
 *
 * @param date the supplied date in acceptable format
 * @returns the date in unix time, or current unix time if no date supplied.
 */
export const generateUnixTime = (date?: string): number => {
  if (!date) {
    return dayjs().unix();
  }

  return dayjs(date).unix();
};

/**
 * Generate range of dates given array of unix timestamps
 */
export const generateDateRangeFromUnixTimeRange = (
  unixTimeRange: number[],
  format: string,
): string => {
  if (generateDate(unixTimeRange[0]) === generateDate(unixTimeRange[1])) {
    unixTimeRange.pop();
  }
  return unixTimeRange.map((unixTime) => generateDate(unixTime, format)).join(' - ');
};

/**
 * Filter out past events
 */
export const isPastEvent = (timestamp: number): boolean => {
  const today = generateUnixTime();
  return today - timestamp > 0;
};

export const parseTime = (time: string): string => {
  if (!time) {
    return '';
  }
  return dayjs(time, 'HH:mm').format('hh:mm A');
};

export const parseUserEventId = (userId: string, eventId: string): string => {
  return `${userId}#${eventId}`;
};

export const fuzzySearchArray = <T>(
  list: T[],
  inputs: string,
  options: Fuse.IFuseOptions<T>,
): Fuse.FuseResult<T>[] => {
  const fuse = new Fuse(list, options);
  return fuse.search(inputs);
};

export const parseMatchStatus = (match: Match): HelperText => {
  const { sponsorStatus, organiserStatus, status } = match;

  switch (status) {
    case MatchGroup.Pending:
      // eslint-disable-next-line no-case-declarations
      const result = {
        message: 'Pending',
        tooltipMessage: '',
      };
      if (sponsorStatus === MatchGroup.Pending && organiserStatus === MatchGroup.Pending) {
        result.tooltipMessage = 'Waiting for organiser and sponsor to respond!';
      }

      if (sponsorStatus === MatchGroup.Accepted && organiserStatus === MatchGroup.Pending) {
        result.tooltipMessage = 'Waiting for organiser respond!';
      }

      if (sponsorStatus === MatchGroup.Pending && organiserStatus === MatchGroup.Accepted) {
        result.tooltipMessage = 'Waiting for sponsor respond!';
      }

      return result;

    case MatchGroup.Accepted:
      return {
        message: 'Accepted',
        tooltipMessage: 'All good to go!',
      };

    case MatchGroup.Rejected:
      return {
        message: 'Rejected',
        tooltipMessage: 'Awww! We hope you find a good match soon!',
      };

    default:
      return {
        message: 'Pending',
        tooltipMessage: 'Waiting for organiser and sponsor to respond!',
      };
  }
};

export const currencyFormatter = (value: number): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'SGD',
  });
  return formatter.format(value);
};

export const getEventAnalyticsData = (events: SponsorEvents, value: EventAnalytics): number => {
  return events
    .map((event) => {
      switch (value) {
        case EventAnalytics.Click:
          return event.clicks;
        case EventAnalytics.Pair:
          return event.pairs;
        case EventAnalytics.Match:
          return event.matches;
        default:
          return 0;
      }
    })
    .reduce((accum, curr) => accum + curr, 0);
};

export const summarizeEvents = (events: SponsorEvents): EventSummary => {
  return {
    clicks: getEventAnalyticsData(events, EventAnalytics.Click),
    pairs: getEventAnalyticsData(events, EventAnalytics.Pair),
    matches: getEventAnalyticsData(events, EventAnalytics.Match),
  };
};

export const getMatchAnalyticData = (matches: Matches, value: MatchStatus): number => {
  return matches.filter((match) => match.status === value).length;
};

export const summarizeMatches = (matches: Matches): MatchSummary => {
  return {
    accepted: getMatchAnalyticData(matches, MatchGroup.Accepted),
    rejected: getMatchAnalyticData(matches, MatchGroup.Rejected),
    pending: getMatchAnalyticData(matches, MatchGroup.Pending),
  };
};
