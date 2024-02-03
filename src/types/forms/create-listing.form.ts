type ListingType = 'PRODUCT' | 'SERVICE';
type ListingStatus = 'PUBLIC' | 'PRIVATE';
type ListingState = 'NEW' | 'LIKE_NEW' | 'USED' | 'REFURBISHED';

export const ListingStatusOptions = ['PUBLIC', 'PRIVATE'];
export const ListingStateOptions = ['NEW', 'LIKE_NEW', 'USED', 'REFURBISHED'];

type ListingCategory = {
  uuid: string;
  name: string;
};

type ListingImage = {
  url: string;
  order: number;
};

type LocationType = {
  lat: number | null;
  lng: number | null;
};

type CreateListingForm = {
  name: string;
  description: string;
  type: ListingType;
  price?: number;
  rental: boolean;
  negotiable: boolean;
  status: ListingStatus;
  state: ListingState;
  category: ListingCategory;
  images: ListingImage[];
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
  tags: string[];
  location: {
    lat: string[];
    lng: string[];
  };
  images: string[];
  global: string[];
};

export type {
  ListingType,
  ListingStatus,
  ListingState,
  ListingCategory,
  ListingImage,
  LocationType,
  CreateListingForm,
  CreateProductErrors,
};
