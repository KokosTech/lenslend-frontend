import {
  Category,
  ImageType,
  LocationType,
  Status,
} from '@/types/forms/common.form';
import { Service } from '@/types/data/place.type';

export type CreatePlaceForm = {
  icon: string;
  name: string;
  description: string;
  status: Status;
  category: Category;
  images: ImageType[];
  tags: string[];
  services: Service[];
  location: LocationType;
};

export type CreatePlaceErrors = {
  icon: string[];
  name: string[];
  description: string[];
  status: string[];
  category: {
    uuid: string[];
    name: string[];
  };
  tags: string[] | Record<number, string>;
  services: string[] | Record<number, string>;
  location: {
    lat: string[];
    lng: string[];
  };
  images: string[];
  global: string[];
};
