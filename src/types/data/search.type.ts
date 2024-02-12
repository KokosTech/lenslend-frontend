import { ShortListingResponse } from '@/types/data/listing.type';
import { CardPlace, User } from '@/types/data/place.type';
import { PaginatedResponse } from '@/types/paginated-response.type';

export type SearchType = ShortListingResponse | CardPlace | User;
export type GlobalSearchResult = {
  listings: PaginatedResponse<ShortListingResponse> | null;
  places: PaginatedResponse<CardPlace> | null;
  users: PaginatedResponse<User> | null;
};
