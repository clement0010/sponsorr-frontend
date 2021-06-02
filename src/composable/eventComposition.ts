import { SponsorrEvent } from '@/types/index';

// eslint-disable-next-line
export default function useEvent() {
  const events: SponsorrEvent[] = [
    {
      title: 'Fundraising Dinner',
      date: new Date('2021-04-10').toDateString(),
      venue: 'Teh Tarik Place',
    },
    {
      title: 'Fun Run',
      date: new Date('2021-04-10').toDateString(),
      venue: 'South Coast Park',
    },
    {
      title: 'Farewell Party',
      date: new Date('2021-04-10').toDateString(),
      venue: 'The Geck',
    },
    {
      title: 'Cinema Outing',
      date: new Date('2021-04-10').toDateString(),
      venue: 'Silver City Cinema',
    },
    {
      title: 'Social Action: Caring for the Old',
      date: new Date('2021-04-10').toDateString(),
      venue: "Old Folks' Home",
    },
    {
      title: 'Some Random Event',
      date: new Date('2021-04-10').toDateString(),
      venue: 'Batam Island',
    },
  ];
  return {
    events,
  };
}
