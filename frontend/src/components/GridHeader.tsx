import React from 'react';
import SortBy from '../interfaces/sortBy';

const GridHeader = ({ columns, onSort }) => {
  return (   
      <thead className="bg-gray-50">
      <tr>
        {columns.map((col) => (
          <th
            key={col.key}
            scope="col"
            className=" px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase"
          >
            <button
              onClick={() => onSort(col.key as SortBy)}
              className={`w-full flex items-center justify-left gap-2 text-gray-400 hover:text-gray-600 ${col.sortable ? 'cursor-pointer' : 'cursor-default'}`}
              disabled={!col.sortable}
              type="button"
            >
              <span>{col.label}</span> {col.sortable && <span>&#8645;</span>}
            </button>
          </th>
        ))}
      </tr>
    </thead>

  );
};

export default React.memo(GridHeader);
