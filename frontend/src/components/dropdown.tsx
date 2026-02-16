import React from 'react';
import { TRANSACTION_TYPES } from '../interfaces';

const Dropdown = ({ onChange, value }) => {
  console.log('Rendering Dropdown component with value:');
  return (
    <div className="w-full">
      <select className="cursor-pointer" value={value} onChange={(e) => onChange(e.target.value)}>
        {TRANSACTION_TYPES.map((type) => (
          <option
            key={type}
            value={type}
            className="text-sm text-blue-500 w-30 hover:bg-indigo-800 hover:text-white"
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
