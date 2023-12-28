import React from "react";

export const Dropdown = ({
  label = "",
  options = [],
  onSelect = () => {},
  defaultText,
  ...rest
}) => {
  return (
    <div>
      <label>{label}</label>
      <select
        className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        onChange={onSelect}
        {...rest}
      >
        {defaultText && (
          <option value="" disabled hidden>
            {defaultText}
          </option>
        )}
        {options.map((option) => (
          <option key={option.key} value={option.key}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
