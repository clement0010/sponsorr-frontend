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

export interface SponsorrEvent {
  title: string;
  date: Date;
  venue: string;
  published: boolean;
}
