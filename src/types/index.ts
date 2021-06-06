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

export interface SponsorEvent {
  title: string;
  createdAt: number;
  date: number;
  venue: string;
  published: boolean;
  views: number;
  clicks: number;
  matches: number;
}

interface Header {
  text: string;
  value: string;
  sortable?: boolean;
}

export interface EventCategory {
  name: string;
  loaded: boolean;
  headers: Header[];
  contents: SponsorEvent[];
  fallback: string;
}
