import React from 'react';

export type SelectOption<T> = {
  value: T;
  label?: string;
};

export interface PageSizeSelectorProps<T> {
  id?: string;
  value: T;
  options: SelectOption<T>[];
  onChange: (size: T) => void;
  label?: string;
}

function DropdownSelector<T extends string | number>({
  id = 'page-size',
  value,
  options,
  onChange,
  label = 'Page Size:',
}: PageSizeSelectorProps<T>) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-gray-700 mr-2">
        {label}
      </label>
      <select
        id={id}
        value={String(value)}
        onChange={(e) => {
          const match = options.find((o) => String(o.value) === e.target.value);
          if (match) onChange(match.value);
        }}
        className="px-3 py-2 bg-gray-200 rounded-md cursor-pointer border border-gray-300"
      >
        {options.map((option) => (
          <option key={String(option.value)} value={String(option.value)}>
            {option.label ?? String(option.value)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropdownSelector;
