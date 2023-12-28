export const Button = ({ ...rest }) => {
  return (
    <button
      {...rest}
      className={`w-fit px-6 py-2 rounded-md bg-light-primary dark:bg-dark-primary text-white font-semibold`}
    />
  );
};
