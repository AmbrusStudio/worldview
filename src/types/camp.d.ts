export type Role = {
  avatarSrc: string;
  name: string;
};

export type Camp = {
  x: number;
  y: number;
  logoSrc: string;
  name: string;
  roles: role[];
};
