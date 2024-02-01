import { ShortListingResponse } from '@/types/data/listing.type';

type PublicProfile = {
  uuid: string;
  name: string;
  username: string;
  phone: string;
  role: string;
  profile_pic?: string;
  header_pic?: string;
  bio?: string;
  created_at: string;
  listings?: ShortListingResponse[];
};

type UserProfile = PublicProfile & {
  email: string;
  date_of_birth: string;
};

export type { PublicProfile, UserProfile };
