export type PaginatedResponse<T> = {
  data: T[];
  limit: number;
  page: number;
  totalCount: number;
};
