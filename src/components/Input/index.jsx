export const Input = ({ label, ...rest }) => {
  return (
    <div className={`flex gap-4 items-center`}>
      <label>{label}</label>
      <input
        {...rest}
        className={`border border-solid border-zinc-500 rounded-md px-2 py-1`}
      />
    </div>
  );
};
