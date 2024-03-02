import { useEffect, useRef, useState } from "react";
import { Input } from "../Input";
import { Button } from "../Button";

export const Dropdown = ({
  label = "",
  name = "",
  value = "",
  options = [],
  onSelect = () => {},
  defaultText = "",
  defaultKey = "id",
  defaultLabel = "name",
  allowSearch = true,
  allowAddNew = false,
  addNewAction = () => {},
  ...rest
}) => {
  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState();
  const [query, setQuery] = useState("");

  const handleInputClick = () => {
    setDropdownOpen((prev) => !prev);
    setQuery("");
    setFilteredOptions(options);
  };

  const handleAddNewClick = () => {
    addNewAction({ name: query });
    setQuery("");
  };

  const handleSelect = (option) => {
    onSelect({
      target: {
        name,
        value: option[defaultKey],
      },
    });
    setDropdownOpen(false);
    setQuery("");
    setFilteredOptions(options);
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
    if (query && query.length) {
      setFilteredOptions(() =>
        options.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else setFilteredOptions(options);
  }, [query, options]);

  return (
    <div ref={dropdownRef} className="w-full">
      <label className="text-xs">{label}</label>
      <div className="relative">
        <div
          onClick={handleInputClick}
          className="w-full flex-1 flex gap-2 rounded-md border border-gray-300  px-4 py-2 text-sm font-medium text-gray-700 cursor-pointer"
        >
          {value && options && options.length
            ? options.find((option) => option.id === value)[defaultLabel]
            : defaultText}
        </div>
        {dropdownOpen && (
          <div
            className="z-10 absolute top-full left-0 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="h-40 overflow-y-auto py-2 px-2">
              {filteredOptions && filteredOptions.length ? (
                filteredOptions.map((option) => (
                  <div
                    key={option[defaultKey]}
                    className="flex items-center cursor-pointer"
                    onClick={() => handleSelect(option)}
                  >
                    <span className="ml-2 text-sm text-gray-700">
                      {option[defaultLabel]}
                    </span>
                  </div>
                ))
              ) : (
                <div>Empty</div>
              )}
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
