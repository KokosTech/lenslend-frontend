type ListingType = 'PRODUCT' | 'SERVICE';
type State = 'NEW' | 'LIKE_NEW' | 'USED' | 'REFURBISHED';
type Status = 'PUBLIC' | 'PRIVATE' | 'REMOVED' | 'DELETED';

type Tag = {
  tag: {
    uuid: string;
    name: string;
  };
};

type ShortListingResponse = {
  uuid: string;
  title: string;
  lat: number;
  lng: number;
  type: ListingType;
  price?: number;
  state?: State;
  rental?: number;
  negotiable: boolean;
  status: string;
  category: {
    uuid: string;
    name: string;
  };
  user: {
    uuid: string;
    name: string;
    username: string;
    bio: string;
    phone?: string;
    profile_pic?: string;
    header_pic?: string;
  };
  images?: [
    {
      uuid: string;
      url: string;
      alt: string;
      status: string;
    },
  ];
  created_at: string;
  updated_at: string;
};

type FullListingResponse = ShortListingResponse & {
  description: string;
  tags?: Tag[];
};

type ListingRequest = {
  title: string;
  description: string;
  type: ListingType;
  price?: number;
  state?: State;
  rental?: number;
  negotiable: boolean;
  status: Status;
  categoryId: string;
  userId: string;
};

export type { ShortListingResponse, FullListingResponse, ListingRequest, Tag };
