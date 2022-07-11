export type Role = {
  avatar: string;
  name: string;
};

export type Camp = {
  x: number;
  y: number;
  logo: string;
  name: string;
  roles: Role[];
};

export type CampVol = {
  id: number;
  cover: string;
  title: string;
};
