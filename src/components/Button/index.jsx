export const Button = ({ className, ...rest }) => {
  return (
    <button
      {...rest}
      className={`w-fit px-6 py-2 rounded-md bg-primary text-white font-semibold ${className}`}
    />
  );
};
