export const Input = ({ label, ...rest }) => {
  return (
    <div className="w-full">
      <label>{label}</label>
      <input
        {...rest}
        className={`border rounded-md px-4 py-2 w-full bg-background`}
      />
    </div>
  );
};
