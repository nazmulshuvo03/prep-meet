export const Checkbox = ({
  label = "",
  checked = false,
  setChecked = () => {},
  className = "",
}) => {
  return (
    <div className={`cursor-pointer w-full ${className}`} onClick={setChecked}>
      <label className="text-xs">{label}</label>
      <div
        className="h-5 w-5 border flex justify-center items-center"
        style={{ margin: "5px 0 11px" }}
      >
        <div
          className={`h-4 w-4 ${
            checked ? "border bg-gray-500" : "bg-transparent"
          }`}
        ></div>
      </div>
    </div>
  );
};
