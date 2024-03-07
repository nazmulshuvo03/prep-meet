export const Banner = ({ text = "", className = "" }) => {
  return (
    <div
      className={`text-center bg-yellow-400 font-semibold text-sm py-1 px-2 ${className}`}
    >
      {text}
    </div>
  );
};
