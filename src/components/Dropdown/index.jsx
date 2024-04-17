import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { Options } from "./Options";

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
    setDropdownOpen(false);
    onSelect({
      target: {
        name,
        value: option ? option[defaultKey] : null,
      },
    });
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
    if (query && query.length && options && options.length) {
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
          className="relative w-full flex-1 flex gap-2 rounded-lg border 
          border-gray-300 bg-white  px-4 py-2 text-sm font-medium text-gray-700 cursor-pointer 
          whitespace-nowrap overflow-hidden text-ellipsis"
          style={{ minHeight: 38 }}
        >
          <div
            className="w-full whitespace-nowrap overflow-hidden text-ellipsis"
            onClick={handleInputClick}
          >
            {value && options && options.length ? (
              <span className="">
                {options.find((option) => option.id === value)[defaultLabel]}
              </span>
            ) : (
              <span className="text-gray-400">{defaultText}</span>
            )}
          </div>
          <div>
            {value ? (
              <FontAwesomeIcon icon={faClose} onClick={() => handleSelect()} />
            ) : (
              <span className="text-gray-500 text-sm">
                {dropdownOpen ? (
                  <FontAwesomeIcon
                    icon={faCaretUp}
                    onClick={handleInputClick}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    onClick={handleInputClick}
                  />
                )}
              </span>
            )}
          </div>
        </div>
        {dropdownOpen && (
          <Options
            {...{
              allowSearch,
              query,
              setQuery,
              allowAddNew,
              filteredOptions,
              handleAddNewClick,
              defaultKey,
              defaultLabel,
              handleSelect,
            }}
          />
        )}
      </div>
    </div>
  );
};
