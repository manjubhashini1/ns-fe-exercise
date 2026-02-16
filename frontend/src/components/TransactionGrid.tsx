import React from 'react';
import { useMemo, useState, useCallback } from 'react';
import useFetchBaseData from '../hooks/useFetchBaseData';
import Tagpill from './Tagpill';
import { SortBy, SortOrder } from '../types';
import GridHeader from './GridHeader';

const TransactionGrid = () => {
  console.log('TransactionGrid component rendered');
  const [sortBy, setSortBy] = useState<SortBy>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const url = useMemo(() => {
    const u = new URL(`${backendUrl}/api/v1/transactions/grid`);
    u.searchParams.set('page', String(page));
    u.searchParams.set('size', String(size));
    u.searchParams.set('sort_by', sortBy);
    u.searchParams.set('sort_order', sortOrder);
    return u.toString();
  }, [backendUrl, sortBy, sortOrder, page, size]);

  const { data, loading, error } = useFetchBaseData(url);
  const transactions = data?.items ?? [];
  const columns = useMemo(
    () => [
      { key: 'date', label: 'Date', sortable: true },
      { key: 'description', label: 'Description', sortable: true },
      { key: 'amount', label: 'Amount', sortable: true },
      { key: 'category', label: 'Category', sortable: false },
      { key: 'tags', label: 'Tags', sortable: false },
    ],
    []
  );
  const totalPages = Math.ceil((data?.total ?? 0) / size);

  const nextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => setPage((prev) => Math.max(prev - 1, 1));
  
  const handleSort = useCallback((key: SortBy) => {
    setSortBy(key);
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  }, []);

  return (
    <div>
      {error && <div className="px-4 py-3 text-red-500">Error: {error}</div>}
      <div className="flex items-center justify-end mb-4">
        <button 
          onClick={prevPage} 
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded-md mr-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        <p>{`Page ${page} of ${totalPages}`}</p>
        <button 
          onClick={nextPage} 
          disabled={page >= totalPages}
          className="px-4 py-2 bg-gray-200 rounded-md ml-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full table-fixed border-collapse divide-y divide-gray-200">
          <GridHeader columns={columns} onSort={handleSort} sortBy={sortBy} />
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
            ) : transactions.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-6 text-left text-gray-500">
                  No transactions found.
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="max-w-2/12  px-6 py-4 whitespace-nowrap text-left text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="max-w-2/12    px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900">
                    {transaction.description}
                  </td>
                  <td className="max-w-2/12   px-6 py-4 whitespace-nowrap text-left text-sm text-gray-500">
                    {transaction.amount}
                  </td>
                  <td className="max-w-2/12   px-6 py-4 whitespace-nowrap text-left text-sm text-gray-500">
                    {transaction.category.name}
                  </td>
                  <td className="max-w-2/12   px-6 py-4 whitespace-nowrap text-left text-sm text-gray-500">
                    {transaction.tags?.map((tag) => (
                      <Tagpill key={tag.id} pills={[tag]} />
                    ))}
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

export default React.memo(TransactionGrid);
