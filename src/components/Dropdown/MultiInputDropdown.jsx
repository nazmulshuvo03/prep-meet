import React, { useEffect, useRef, useState } from "react";
import { Input } from "../Input";
import { Button } from "../Button";

export const MultiInputDropdown = ({
  label = "",
  name = "",
  options = [],
  value = [],
  onSelect = () => {},
  defaultText = "",
  defaultKey = "id",
  defaultLabel = "name",
  allowSearch = true,
  allowAddNew = false,
  addNewAction = () => {},
}) => {
  const dropdownRef = useRef(null);
  const [selectedOptions, setSelectedOptions] = useState(value);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState();
  const [query, setQuery] = useState("");

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
    setDropdownOpen((prev) => !prev);
    setQuery("");
    setFilteredOptions(options);
  };

  const handleAddNewClick = () => {
    addNewAction({ name: query });
    setQuery("");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setQuery("");
        setFilteredOptions(options);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (value && value.length) setSelectedOptions(value);
  }, [value]);

  useEffect(() => {
    onSelect({
      target: {
        name,
        value: selectedOptions,
      },
    });
  }, [selectedOptions]);

  useEffect(() => {
    if (query && query.length) {
      setFilteredOptions(() =>
        options.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else setFilteredOptions(options);
  }, [query]);

  return (
    <div ref={dropdownRef} className="w-full flex flex-col">
      <label className="text-xs">{label}</label>
      <div className="relative">
        <div
          onClick={handleInputClick}
          className="flex-1 flex flex-wrap gap-2 rounded-lg border border-gray-300  px-4 py-2 text-sm font-medium text-gray-700 cursor-pointer"
        >
          {selectedOptions && selectedOptions.length ? (
            selectedOptions.map((seleted) => {
              const selectedOption = options.find(
                (option) => option[defaultKey] === seleted
              );
              return (
                <div
                  key={seleted}
                  className="bg-gray-400 text-white rounded-md py-1 px-2"
                >
                  {selectedOption ? selectedOption[defaultLabel] : "Not Found"}
                </div>
              );
            })
          ) : (
            <div>{defaultText}</div>
          )}
        </div>
        {dropdownOpen && (
          <div
            className="z-10 absolute top-full left-0 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="max-h-56 overflow-y-auto">
              <div className="py-2 px-2" role="none">
                {filteredOptions && filteredOptions.length ? (
                  filteredOptions.map((option) => (
                    <label
                      key={option[defaultKey]}
                      className="flex items-center"
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 border-gray-300 rounded"
                        onChange={() => {
                          handleCheckboxChange(option[defaultKey]);
                        }}
                        checked={selectedOptions.includes(option[defaultKey])}
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {option[defaultLabel]}
                      </span>
                    </label>
                  ))
                ) : (
                  <div>Empty</div>
                )}
              </div>
            </div>
            {allowSearch ? (
              <div className="flex gap-0">
                <Input
                  type="text"
                  placeholder="Search..."
                  name=""
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {allowAddNew &&
                query &&
                query.length &&
                filteredOptions &&
                !filteredOptions.length ? (
                  <Button onClick={handleAddNewClick}>Add New</Button>
                ) : (
                  <div />
                )}
              </div>
            ) : (
              <div />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
