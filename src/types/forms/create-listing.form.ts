type ListingType = 'PRODUCT' | 'SERVICE';
type ListingStatus = 'PUBLIC' | 'PRIVATE';
type ListingState = 'NEW' | 'LIKE_NEW' | 'USED' | 'REFURBISHED';

type ListingCategory = {
  uuid: string;
  name: string;
};

type ListingImage = {
  url: string;
  order: number;
};

type LocationType = {
  lat: number;
  lng: number;
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
  location: LocationType | null;
};

export type {
  ListingType,
  ListingStatus,
  ListingState,
  ListingCategory,
  ListingImage,
  LocationType,
  CreateListingForm,
};
