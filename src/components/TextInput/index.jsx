export const TextInput = ({
  label = "",
  placeholder = "",
  value = "",
  setValue = () => {},
  rows = "1",
  cols = "50",
  ...rest
}) => {
  return (
    <label>
      <div>{label}</div>
      <textarea
        rows={rows}
        cols={cols}
        placeholder={placeholder}
        value={value}
        onChange={setValue}
        className="border px-4 py-2 w-full text-sm text-gray-500 bg-white"
        {...rest}
      ></textarea>
    </label>
  );
};
