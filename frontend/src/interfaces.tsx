export const TRANSACTION_TYPES = ['credit', 'debit', 'all'] as const;

export type transactionType = (typeof TRANSACTION_TYPES)[number];

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: transactionType;
  category_rel: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
  date: string;
  user_id: number;
  tags?: { id: number; name: string }[];
}

type SortBy = 'date' | 'amount' | 'description' | 'type' | 'category';
type SortOrder = 'asc' | 'desc';

/**
 * useDataGrid Hook Interfaces
 */

export interface SortConfig {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface GridState<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  loading: boolean;
  error: string | null;
}

export type GridAction<T> = 
    { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_SORT'; payload: SortConfig }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_DATA'; payload: { data: T[]; total: number } }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET' };

export interface UseDataGridConfig {
  apiUrl: string;
  pageSize?: number;
  initialPage?: number;
  initialSortBy?: string;
  initialSortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
}

export interface UseDataGridReturn<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  loading: boolean;
  error: string | null;
  setPage: (page: number) => void;
  setSort: (sortBy: string) => void;
  refresh: () => void;
}
