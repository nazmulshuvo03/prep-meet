export const Banner = ({ text = "", className = "" }) => {
  return (
    <div
      className={`text-center bg-yellow-300 font-light text-sm py-1 px-2 ${className}`}
    >
      {text}
    </div>
  );
};
