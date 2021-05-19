export type Role = 'Sponsor' | 'EventOrganiser';

export interface Profile {
  id: string;
  role: Role;
  name: string;
  email: string;
  about: string;
  phone: string;
  link: string;
  location: string;
  picture: string;
}

export interface Sponsor {
  id: string;
  eventName: string;
}
