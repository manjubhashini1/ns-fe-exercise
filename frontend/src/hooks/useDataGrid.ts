import { useReducer, useCallback, useEffect, useRef, useMemo } from 'react';
import {
  SortConfig,
  GridState,
  GridAction,
  UseDataGridConfig,
  UseDataGridReturn,
} from '../interfaces';

/**
 * Generic Data Grid Hook
 *
 * Encapsulates all state and logic for managing paginated, sortable data grid components.
 * Optimized for performance with memoized callbacks and minimal re-renders.
 *
 *
 * @example
 * // Basic usage:
 * const { data, total, loading, error, page, pageSize, sortBy, sortOrder, setPage, setSort, refresh } = useDataGrid<Transaction>({
 *   apiUrl: 'https://api.example.com/transactions/grid',
 *   pageSize: 10
 * });
 *
 * @example
 * // With filtering:
 * const { data, ...rest } = useDataGrid<Transaction>({
 *   apiUrl: 'https://api.example.com/transactions/grid',
 *   pageSize: 10,
 *   filters: { type: 'debit' } //if api supports
 * });
 */

/**
 * useDataGrid - Custom React hook for managing data grid state and API calls
 *
 * Architectural Decisions:
 * 1. useReducer is used for state management to handle multiple related state updates
 * 2. useCallback memoizes all exposed methods to prevent unnecessary re-renders of child components
 * 3. A ref tracks the current page to prevent stale closures in the fetch effect
 * 4. The fetch is triggered by dependencies (page, sortBy, sortOrder, filters, apiUrl)
 * 5. Filters are passed as query parameters to support server-side filtering
 *
 * Performance Optimizations:
 * - Callbacks are memoized to prevent child component re-renders
 * - API calls only happen when truly necessary (page/sort/filter changes)
 * - Error state is cleared on new requests to avoid stale errors
 */
function useDataGrid<T = any>(config: UseDataGridConfig): UseDataGridReturn<T> {
  const {
    apiUrl,
    pageSize = 10,
    initialPage = 1,
    initialSortBy = 'date',
    initialSortOrder = 'desc',
    filters = {},
  } = config;

  const memoizedFilters = useMemo(() => filters, [JSON.stringify(filters)]);

  // Initial state
  const initialState: GridState<T> = {
    data: [],
    total: 0,
    page: initialPage,
    pageSize,
    sortBy: initialSortBy,
    sortOrder: initialSortOrder,
    loading: true,
    error: null,
  };

  // Reducer function for state management
  const gridReducer = (state: GridState<T>, action: GridAction<T>): GridState<T> => {
    switch (action.type) {
      case 'SET_PAGE':
        return { ...state, page: action.payload };
      case 'SET_PAGE_SIZE':
        return { ...state, pageSize: action.payload, page: 1 };
      case 'SET_SORT':
        return { ...state, ...action.payload, page: 1 }; // Reset to page 1 on sort change
      case 'SET_LOADING':
        return { ...state, loading: action.payload };
      case 'SET_DATA':
        return { ...state, data: action.payload.data, total: action.payload.total };
      case 'SET_ERROR':
        return { ...state, error: action.payload };
      case 'RESET':
        return initialState;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(gridReducer, initialState);

  // Use a ref to track the current page to avoid stale closures
  const pageRef = useRef(state.page);
  useEffect(() => {
    pageRef.current = state.page;
  }, [state.page]);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        dispatch({ type: 'SET_ERROR', payload: null });

        const url = new URL(apiUrl);
        url.searchParams.set('page', String(state.page));
        url.searchParams.set('size', String(state.pageSize));
        url.searchParams.set('sort_by', state.sortBy);
        url.searchParams.set('sort_order', state.sortOrder);

        // Add filters to query parameters
        Object.entries(memoizedFilters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            url.searchParams.set(key, String(value));
          }
        });

        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        dispatch({
          type: 'SET_DATA',
          payload: {
            data: result.items || [],
            total: result.total || 0,
          },
        });
        dispatch({ type: 'SET_LOADING', payload: false });
      } catch (err) {
        dispatch({
          type: 'SET_ERROR',
          payload: err instanceof Error ? err.message : 'An error occurred',
        });
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    fetchData();
  }, [state.page, state.pageSize, state.sortBy, state.sortOrder, apiUrl, memoizedFilters]);

  // Memoized callback to set page
  const setPage = useCallback(
    (newPage: number) => {
      //const maxPage = Math.ceil(state.total / state.pageSize) || 1;
      const validPage = Math.max(1, newPage);
      dispatch({ type: 'SET_PAGE', payload: validPage });
    },
    [state.total, state.pageSize]
  );

  // Memoized callback to set page size
  const setPageSize = useCallback((newSize: number) => {
    const size = Math.max(1, Math.floor(newSize));
    dispatch({ type: 'SET_PAGE_SIZE', payload: size });
  }, []);

  // Memoized callback to set sort
  // Toggles sort order if same column is clicked, otherwise sets new column with 'desc' order
  const setSort = useCallback(
    (newSortBy: string) => {
      const newSortOrder = state.sortBy === newSortBy && state.sortOrder === 'asc' ? 'desc' : 'asc';
      dispatch({
        type: 'SET_SORT',
        payload: { sortBy: newSortBy, sortOrder: newSortOrder },
      });
    },
    [state.sortBy, state.sortOrder]
  );

  // Memoized callback to refresh data
  const refresh = useCallback(() => {
    dispatch({ type: 'SET_PAGE', payload: 1 });
  }, []);

  return {
    data: state.data,
    total: state.total,
    page: state.page,
    pageSize: state.pageSize,
    sortBy: state.sortBy,
    sortOrder: state.sortOrder,
    loading: state.loading,
    error: state.error,
    setPage,
    setSort,
    setPageSize,
    refresh,
  };
}

export default useDataGrid;
