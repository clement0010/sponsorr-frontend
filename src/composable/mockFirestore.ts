import { generateCurrentUnixTime, generateUnixTimeFromDate, isPastEvent } from '@/common/utility';
import { SponsorEvent } from '@/types';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function database() {
  const events: SponsorEvent[] = [
    {
      title: 'Cinema Outing',
      createdAt: generateCurrentUnixTime(),
      date: generateUnixTimeFromDate('2021-01-25'),
      venue: 'Silver City Cinema',
      published: false,
      views: 0,
      clicks: 0,
      matches: 0,
    },
    {
      title: 'Social Action: Caring for the Old',
      createdAt: generateCurrentUnixTime(),
      date: generateUnixTimeFromDate('2022-01-25'),
      venue: "Old Folks' Home",
      published: false,
      views: 0,
      clicks: 0,
      matches: 0,
    },
    {
      title: 'Some Random Event',
      createdAt: generateCurrentUnixTime(),
      date: generateUnixTimeFromDate('2021-01-25'),
      venue: 'Batam Island',
      published: false,
      views: 0,
      clicks: 0,
      matches: 0,
    },
    {
      title: 'Fundraising Dinner',
      createdAt: generateCurrentUnixTime(),
      date: generateUnixTimeFromDate('2022-12-25'),
      venue: 'Teh Tarik Place',
      published: true,
      views: 0,
      clicks: 0,
      matches: 0,
    },
    {
      title: 'Fun Run',
      createdAt: generateCurrentUnixTime(),
      date: generateUnixTimeFromDate('2022-12-25'),
      venue: 'South Coast Park',
      published: true,
      views: 0,
      clicks: 0,
      matches: 0,
    },
    {
      title: 'Farewell Party',
      createdAt: generateCurrentUnixTime(),
      date: generateUnixTimeFromDate('2022-12-25'),
      venue: 'The Geck',
      published: true,
      views: 0,
      clicks: 0,
      matches: 0,
    },
    {
      title: 'Filler Event 1',
      createdAt: generateCurrentUnixTime(),
      date: generateUnixTimeFromDate('2021-01-25'),
      venue: 'Silver City Cinema',
      published: true,
      views: 0,
      clicks: 0,
      matches: 0,
    },
    {
      title: 'Filler Event 2',
      createdAt: generateCurrentUnixTime(),
      date: generateUnixTimeFromDate('2021-01-25'),
      venue: "Old Folks' Home",
      published: true,
      views: 0,
      clicks: 0,
      matches: 0,
    },
    {
      title: 'Filler Event 3',
      createdAt: generateCurrentUnixTime(),
      date: generateUnixTimeFromDate('2021-01-25'),
      venue: 'Batam Island',
      published: true,
      views: 0,
      clicks: 0,
      matches: 0,
    },
  ];

  const sleep = (ms: number): Promise<unknown> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const fetchUpcomingEvents = async () => {
    await sleep(1000);
    return events.filter((event) => !isPastEvent(event.date) && event.published);
  };

  const fetchPastEvents = async () => {
    await sleep(1000);
    return events.filter((event) => isPastEvent(event.date) && event.published);
  };

  const fetchDrafts = async () => {
    await sleep(1000);
    return events.filter((event) => !event.published);
  };

  const removeEvent = async (event: SponsorEvent) => {
    await sleep(1000);
    events.splice(events.indexOf(event), 1);
  };

  const publishStatus = async (event: SponsorEvent, publish: boolean) => {
    await sleep(1000);
    const eventRef = event;
    eventRef.published = publish;
  };

  return { fetchUpcomingEvents, fetchPastEvents, fetchDrafts, removeEvent, publishStatus };
}
