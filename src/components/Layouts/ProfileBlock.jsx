export const ProfileBlock = ({ children, title = "", className = "" }) => {
  return (
    <div
      className={`bg-white px-4 py-3 h-fit w-full flex flex-col rounded-md shadow-md ${className}`}
    >
      {title && (
        <div className="font-semibold text-lg text-center pt-2 pb-3">
          {title}
        </div>
      )}
      {children}
    </div>
  );
};
