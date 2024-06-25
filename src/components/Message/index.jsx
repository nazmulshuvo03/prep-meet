import { useState } from "react";
import { Menu } from "../Modal/Menu";
import { MessageIcon } from "./MessageIcon";
import { MessageInbox } from "./MessageInbox";

export const Message = () => {
  const [showData, setShowData] = useState(false);

  return (
    <Menu
      handlerComponent={<MessageIcon />}
      showMenu={showData}
      setShowMenu={setShowData}
      menuClasses="!top-7 -right-4"
    >
      <MessageInbox setShowData={setShowData} />
    </Menu>
  );
};
