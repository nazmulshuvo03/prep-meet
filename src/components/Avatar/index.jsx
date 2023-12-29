import { useState } from "react";
import { ProfileMenu } from "./ProfileMenu";

export const Avatar = ({
  url = "https://th.bing.com/th/id/R.98fd5107cc6e41a1c0bd49289d863a1f?rik=LMKgHNqXDH8G2A&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fUser-Profile-PNG.png&ehk=%2bRw6Gx3u57%2fACYW3MfLygtsoE%2fOOVGjvsM8PMQNAQvE%3d&risl=&pid=ImgRaw&r=0",
}) => {
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
        src={url}
        alt={"Profile Image"}
        className="h-12 w-12 rounded-full shadow-md cursor-pointer border-2 transition duration-300 ease-in-out hover:shadow-none"
      />
      {isMenuOpen && <ProfileMenu />}
    </div>
  );
};
