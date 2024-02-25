export const Dropdown = ({
  label = "",
  options = [],
  onSelect = () => {},
  defaultText = "",
  defaultKey = "id",
  defaultLabel = "name",
  ...rest
}) => {
  return (
    <div className="w-full">
      <label>{label}</label>
      <select
        className="block appearance-none w-full bg-background border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none"
        onChange={onSelect}
        {...rest}
      >
        {defaultText && (
          <option value="" disabled hidden>
            {defaultText}
          </option>
        )}
        {options.map((option, i) => (
          <option
            key={defaultKey ? option[defaultKey] : i}
            value={option[defaultKey]}
          >
            {option[defaultLabel]}
          </option>
        ))}
      </select>
    </div>
  );
};
