/**
 * Sizes: normal, small, big
 */

export const Button = ({ className, size = "normal", ...rest }) => {
  return (
    <>
      {size === "small" ? (
        <button
          {...rest}
          className={`w-fit px-6 py-1 bg-primary text-sm text-white font-semibold whitespace-nowrap ${className}`}
        />
      ) : (
        <button
          {...rest}
          className={`w-fit px-6 py-2 bg-primary text-base text-white font-semibold whitespace-nowrap ${className}`}
        />
      )}
    </>
  );
};
