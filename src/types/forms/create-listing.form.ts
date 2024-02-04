import {
  Category,
  ImageType,
  LocationType,
  Status,
} from '@/types/forms/common.form';

type ListingType = 'PRODUCT' | 'SERVICE';
type ListingState = 'NEW' | 'LIKE_NEW' | 'USED' | 'REFURBISHED';

export const ListingStateOptions = ['NEW', 'LIKE_NEW', 'USED', 'REFURBISHED'];

type CreateListingForm = {
  name: string;
  description: string;
  type: ListingType;
  price?: number;
  rental: boolean;
  negotiable: boolean;
  status: Status;
  state: ListingState;
  category: Category;
  images: ImageType[];
  tags: string[];
  location: LocationType;
};

type CreateProductErrors = {
  name: string[];
  description: string[];
  price: string[];
  rental: string[];
  negotiable: string[];
  state: string[];
  status: string[];
  category: {
    uuid: string[];
    name: string[];
  };
  tags: string[] | Record<number, string>;
  location: {
    lat: string[];
    lng: string[];
  };
  images: string[];
  global: string[];
};

export type {
  ListingType,
  ListingState,
  LocationType,
  CreateListingForm,
  CreateProductErrors,
};
