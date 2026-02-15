import React from 'react';
import { useMemo, useCallback } from 'react';
import useDataGrid from '../hooks/useDataGrid';
import Tagpill from './Tagpill';
import { SortBy, SortOrder } from '../types';
import GridHeader from './GridHeader';

const TransactionGrid = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Initialize the data grid hook with API endpoint and configuration
  const {
    data,
    total,
    page,
    pageSize,
    sortBy,
    sortOrder,
    loading,
    error,
    setPage,
    setSort,
    refresh,
  } = useDataGrid<any>({
    apiUrl: `${backendUrl}/api/v1/transactions/grid`,
    pageSize: 5,
    initialSortBy: 'date',
    initialSortOrder: 'asc',
  });

  const transactions = data ?? [];
  const columns = useMemo(
    () => [
      { key: 'date', label: 'Date', sortable: true },
      { key: 'description', label: 'Description', sortable: true },
      { key: 'amount', label: 'Amount', sortable: true },
      { key: 'type', label: 'Type', sortable: false },
      { key: 'category', label: 'Category', sortable: false },
      { key: 'tags', label: 'Tags', sortable: false },
    ],
    []
  );
  const totalPages = Math.ceil(total / pageSize) || 1;

  // Handle pagination
  const nextPage = useCallback(() => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }, [page, totalPages, setPage]);

  const prevPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page, setPage]);

  // Handle sorting - toggle order if same column, otherwise set new column
  const handleSort = useCallback(
    (key: SortBy) => {
      setSort(key);
    },
    [setSort]
  );

  return (
    <div>
      {error && <div className="px-4 py-3 text-red-500">Error: {error}</div>}

      <div className="flex items-center justify-end mb-4">
        <div>
          <button
            onClick={()=> refresh()}
            className="px-4 py-2 bg-gray-200 rounded-md mr-2 cursor-pointer"
          >
            Refresh
          </button>
        </div>
        <button onClick={prevPage} className="px-4 py-2 bg-gray-200 rounded-md mr-2 cursor-pointer">
          Prev
        </button>
        <p>{`Page ${page} of ${totalPages}`}</p>
        <button onClick={nextPage} className="px-4 py-2 bg-gray-200 rounded-md ml-2 cursor-pointer">
          Next
        </button>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full table-fixed border-collapse divide-y divide-gray-200">
          <GridHeader columns={columns} onSort={handleSort} sortOrder={sortOrder} />
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              Array.from({ length: 5 }).map((_, rowIdx) => (
                <tr key={`skeleton-${rowIdx}`} className="animate-pulse">
                  <td className="max-w-2/12   px-6 py-4 text-left">
                    <div className="h-4  bg-gray-200 rounded mx-auto" />
                  </td>

                  <td className="max-w-2/12  px-6 py-4 text-left">
                    <div className="h-4  bg-gray-200 rounded" />
                  </td>

                  <td className="max-w-2/12  px-6 py-4 text-left">
                    <div className="h-4  bg-gray-200 rounded" />
                  </td>

                  <td className="max-w-2/12   px-6 py-4 text-left">
                    <div className="h-4  bg-gray-200 rounded mx-auto" />
                  </td>

                  <td className="max-w-2/12   px-6 py-4 text-left">
                    <div className="h-4  bg-gray-200 rounded mx-auto" />
                  </td>

                  <td className="max-w-2/12  px-6 py-4 text-left">
                    <div className="flex justify-left gap-2">
                      <div className="max-w-1/4 h-6 w-12 bg-gray-200 rounded-full" />
                      <div className="max-w-1/4h-6 w-10 bg-gray-200 rounded-full" />
                    </div>
                  </td>
                </tr>
              ))
            ) : error ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-6 text-left text-red-500">
                  Failed to load transactions. Please try again.
                </td>
              </tr>
            ) : transactions.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-6 text-left text-gray-500">
                  No transactions found.
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="max-w-2/12  px-6 py-4  text-left text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="max-w-2/12    px-6 py-4  text-left text-sm text-gray-900">
                    {transaction.description}
                  </td>
                  <td className="max-w-2/12   px-6 py-4  text-left text-sm text-gray-500">
                    {transaction.amount}
                  </td>
                  <td className="max-w-2/12   px-6 py-4  text-left text-sm text-gray-500">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${transaction.type === 'credit' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    >
                      {transaction.type}
                    </span>
                  </td>
                  <td className="max-w-2/12   px-6 py-4  text-left text-sm text-gray-500">
                    {transaction.category.name}
                  </td>

                  <td className="max-w-2/12   px-6 py-4  text-left text-sm text-gray-500">
                    <div className="flex flex-wrap gap-2">
                      <Tagpill pills={transaction.tags} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionGrid;
