import { Tag } from '@/types/data/listing.type';

type Status = 'PUBLIC' | 'PRIVATE' | 'REMOVED' | 'DELETED';

type Review = {
  uuid: string;
  content: string;
  rating: number;
  created_at: string;
  updated_at: string;
  user: User;
};

type Visitor = {
  uuid: string;
  created_at: string;
  user: User;
};

type Service = {
  uuid: string;
  name: string;
  icon: string;
};

type User = {
  uuid: string;
  name: string;
  username: string;
  bio: string;
  phone?: string;
  profile_pic?: string;
  header_pic?: string;
  rating?: number;
};

type ShortPlace = {
  uuid: string;
  lat: number;
  lng: number;
  icon: string;
};

type CardPlace = ShortPlace & {
  name: string;
  thumbnail: {
    uuid: string;
    url: string;
    alt: string;
  };
  rating: number;
};

type Place = ShortPlace & {
  name: string;
  description: string;
  category: {
    uuid: string;
    name: string;
  };
  lat: number;
  lng: number;
  images: {
    uuid: string;
    url: string;
    alt: string;
  }[];
  services: {
    service: Service;
  }[];
  tags: Tag[];
  visitors: Visitor[];
  reviews: Review[];
  rating: number;
  status: Status;
  creator: {
    uuid: string;
    name: string;
    username: string;
    bio: string;
    phone?: string;
    profile_pic?: string;
    header_pic?: string;
  };
  owner: {
    uuid: string;
    name: string;
    username: string;
    bio: string;
    phone?: string;
    profile_pic?: string;
    header_pic?: string;
  };
  created_at: string;
  updated_at: string;
};

export type { CardPlace, ShortPlace, Place, Service, Visitor, User, Review };
