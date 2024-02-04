export type Status = 'PUBLIC' | 'PRIVATE';
export type Category = {
  uuid: string;
  name: string;
};

export type ImageType = {
  url: string;
  order: number;
};

export type LocationType = {
  lat: number | null;
  lng: number | null;
};

export const StatusOptions: Status[] = ['PUBLIC', 'PRIVATE'];
