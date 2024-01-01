import React, { useState } from "react";

export const ThemeSwitch = ({
  leftText = "",
  rightText = "",
  handleAction = () => {},
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
    handleAction();
  };

  return (
    <label className="flex items-center justify-center cursor-pointer gap-2">
      <div className="relative">
        <input
          type="checkbox"
          className="hidden"
          checked={isChecked}
          onChange={toggleSwitch}
        />
        <div className="w-16 h-6 bg-slate-100 rounded-full shadow-inner"></div>
        <div
          className={`absolute w-6 h-6 rounded-full shadow top-0 border-2 border-sky-400 bg-white flex justify-center items-center ease-in-out duration-300 ${
            isChecked ? "ease-in-out duration-300" : ""
          }`}
          style={{ translate: isChecked ? "160%" : "0" }}
        >
          {isChecked ? <>{rightText}</> : <>{leftText}</>}
        </div>
      </div>
    </label>
  );
};
