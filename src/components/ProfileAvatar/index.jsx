import { useState } from "react";
import { ProfileMenu } from "./ProfileMenu";
import { useSelector } from "react-redux";
import { HoverCard } from "@radix-ui/themes";

export const ProfileAvatar = () => {
  const user = useSelector((state) => state.user.profile);

  return (
    <HoverCard.Root>
      <HoverCard.Trigger>
        <img
          src={user?.photoURL}
          alt={"Profile Image"}
          className="h-12 w-12 rounded-full shadow-md cursor-pointer border-2 transition duration-300 ease-in-out hover:shadow-none"
        />
      </HoverCard.Trigger>
      <HoverCard.Content>
        <ProfileMenu />
      </HoverCard.Content>
    </HoverCard.Root>
  );
};
