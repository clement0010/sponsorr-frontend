import firebase from 'firebase/app';

export type FirebaseUser = firebase.User;

export type Role = 'Sponsor' | 'EventOrganiser';

export interface Contact {
  contactEmail?: string;
  contactPhone?: string;
  location?: string;
  websiteURL?: string;
}

export interface User {
  email: string;
  name: string;
  phoneNumber: string;
  uen?: string;
}

export interface EventOrganiser extends User {
  role: Role;
}

export interface Profile extends User {
  about?: string;
  contact: Contact;
  id: string;
  keywords: string[];
  displayPicture?: string;
  role: Role;
}

export interface Sponsor extends User {
  role: Role;
}
