import React, { useEffect, useRef, useState } from "react";

export const MultiInputDropdown = ({
  label = "",
  name = "",
  options = [],
  value = [],
  onSelect = () => {},
}) => {
  const dropdownRef = useRef(null);
  const [selectedOptions, setSelectedOptions] = useState(value);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleOption = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleCheckboxChange = (option) => {
    toggleOption(option);
  };

  const handleInputClick = () => {
    setDropdownOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (value) setSelectedOptions(value);
  }, [value]);

  useEffect(() => {
    onSelect({
      target: {
        name,
        value: selectedOptions,
      },
    });
  }, [selectedOptions]);

  return (
    <div ref={dropdownRef} className="w-full h-26 flex flex-col">
      <label>{label}</label>
      <div
        onClick={handleInputClick}
        className="relative w-full flex-1 flex gap-2 rounded-md border border-gray-300  px-4 py-2 text-sm font-medium text-gray-700"
      >
        {selectedOptions &&
          selectedOptions.length &&
          selectedOptions.map((seleted) => (
            <div key={seleted}>
              {options.find((option) => option.key === seleted).label}
            </div>
          ))}
        {dropdownOpen && (
          <div
            className="absolute top-full left-0 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="py-2 px-2" role="none">
              {options &&
                options.length &&
                options.map((option) => (
                  <label key={option.key} className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4  border-gray-300 rounded"
                      onChange={() => {
                        handleCheckboxChange(option.key);
                      }}
                      checked={selectedOptions.includes(option.key)}
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {option.label}
                    </span>
                  </label>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
