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
  role: Role;
  about: string;
  contact: Contact;
  keywords: string[];
  displayPicture: string;
}

export interface EventOrganiser extends User {
  role: Role;
}
export interface Sponsor extends User {
  role: Role;
}
