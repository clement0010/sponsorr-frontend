import firebase from 'firebase/app';

export type FirebaseUser = firebase.User;

export type Role = 'Sponsor' | 'EventOrganiser';

export interface Contact {
  location: string;
  websiteUrl: string;
}

export interface User {
  email: string;
  name: string;
  phoneNumber: string;
  uen?: string;
}

export interface Profile extends User {
  about: string;
  contact: Contact;
  keywords: string[];
  displayPicture: string;
}

export interface EventOrganiser extends Profile {
  role: Role;
}
export interface Sponsor extends Profile {
  role: Role;
}

export type EventStatus = 'draft' | 'published' | 'matched';

export interface SponsorEvent {
  eventID: string;
  title: string;
  description: string;
  createdAt: number;
  date: number[];
  venue: string;
  published: boolean;
  views: number;
  clicks: number;
  matches: number;
  status: EventStatus;
}

export type SponsorEvents = SponsorEvent[];

interface Header {
  text: string;
  value: string;
  sortable?: boolean;
  align?: string;
}

export interface EventCategory {
  name: EventStatus;
  loaded: boolean;
  headers: Header[];
  contents: SponsorEvent[];
  fallback: string;
}

export interface SponsorRequest {
  itemName: string;
  description: string;
  valueInSGD: string;
}

export type MatchStatus = 'pending' | 'rejected' | 'accepted';

export interface Match {
  title: string;
  description: string;
  eventID: string;
  status: MatchStatus;
  sponsorID: string;
}

export interface MatchCategory {
  name: MatchStatus;
  loaded: boolean;
  headers: Header[];
  contents: Match[];
  fallback: string;
}

export type Matches = Match[];
