export type TPagination = {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number;
  page: number;
  pageCount: number;
  prevPage: number | null;
  totalCount: number;
  totalPages: number;
};

export interface IPostAPIResponse<T = any> {
  status?: number;
  message?: string;
  error?: string;
  data?: T;
  type?: string;
  pagination?: TPagination;
  token?: string;
  refreshToken?: string;
}

export interface IGetAPIResponse<T = any> {
  status?: number;
  message?: string;
  error?: string;
  data?: T;
  type?: string;
  pagination?: TPagination;
  token?: string;
  refreshToken?: string;
}