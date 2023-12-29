import { useState } from "react";
import { ProfileMenu } from "./ProfileMenu";
import { useSelector } from "react-redux";

export const Avatar = () => {
  const user = useSelector((state) => state.user.profile);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAvatarHover = () => {
    setIsMenuOpen(true);
  };

  const handleAvatarLeave = () => {
    setIsMenuOpen(false);
  };

  return (
    <div
      className="relative w-fit h-fit rounded-full bg-gray-500 cursor-pointer"
      onMouseEnter={handleAvatarHover}
      onMouseLeave={handleAvatarLeave}
    >
      <img
        src={user?.photoURL}
        alt={"Profile Image"}
        className="h-12 w-12 rounded-full shadow-md cursor-pointer border-2 transition duration-300 ease-in-out hover:shadow-none"
      />
      {isMenuOpen && <ProfileMenu />}
    </div>
  );
};
