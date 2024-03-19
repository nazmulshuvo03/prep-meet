import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "../../Button/IconButton";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import styles from "./style.module.css";

export const FaqCard = ({ data }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border-b border-text py-4 ${data.id === 1 ? "border-t" : ""}`}
    >
      <div className={`flex items-center justify-between`}>
        <div className="text-base font-medium">{data.qn}</div>
        <IconButton onClick={() => setOpen((prev) => !prev)}>
          <FontAwesomeIcon
            icon={open ? faAngleUp : faAngleDown}
            className="text-text"
          />
        </IconButton>
      </div>
      <div
        className={`py-4 pl-4 text-sm font-light ${
          open ? `${styles.animateSlideDown}` : `${styles.animateSlideUp}`
        }`}
      >
        {data.ans}
      </div>
    </div>
  );
};
