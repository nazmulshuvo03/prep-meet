export const ProfileCardCapsul = ({ children = "", className }) => (
  <div
    className={`px-4 py-0.5 h-fit rounded-full font-extralight text-xs ${className}`}
    // style={{ fontSize: 8 }}
  >
    {children}
  </div>
);
