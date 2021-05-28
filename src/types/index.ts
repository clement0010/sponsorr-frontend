import firebase from 'firebase/app';

export type FirebaseUser = firebase.User

export type Role = 'Sponsor' | 'EventOrganiser';

export interface User extends FirebaseUser {
  role: Role;
}
export interface Profile {
  id: string;
  name: string;
  email: string;
  about: string;
  phone: string;
  link: string;
  location: string;
  picture: string;
  keywords: string[];
}
export interface Sponsor {
  id: string;
  eventName: string;
}
