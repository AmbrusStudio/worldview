declare namespace API {
  export type Response<T> = {
    code: number;
    msg: string;
    data: T;
  };
  // camp role
  export type RangerList = {
    id: number;
    avatar: string;
    thumbnail: string;
    icon: string;
    name: string;
    title: string;
  };
  // camp
  export type Camp = {
    id: number;
    logo: string;
    name: string;
    slogan: string;
    coordinate: string;
    ranger_list: RangerList[];
  };
}
