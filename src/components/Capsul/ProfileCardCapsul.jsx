export const ProfileCardCapsul = ({ children = "", className }) => (
  <div
    className={`px-4 py-0.5 rounded-full bg-primary text-white font-extralight ${className}`}
    style={{ fontSize: 8 }}
  >
    {children}
  </div>
);
