import { useState } from "react";
import { ProfileMenu } from "./ProfileMenu";
import { useSelector } from "react-redux";

/**
 * example usage: {user && <ProfileAvatar url={user.profileImage} />}
 */

export const ProfileAvatar = () => {
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
      className="relative w-fit h-fit rounded-full cursor-pointer z-50"
      onMouseEnter={handleAvatarHover}
      onMouseLeave={handleAvatarLeave}
    >
      <img
        src={user?.photoURL}
        alt={"Profile Image"}
        className="h-12 w-12 rounded-full cursor-pointer transition duration-300 ease-in-out hover:shadow-none"
      />
      {isMenuOpen && <ProfileMenu />}
    </div>
  );
};
