import React, { useState } from "react";

export const Tooltip = ({ text, children }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  return (
    <div className="relative inline-block">
      {isTooltipVisible && (
        <div className="absolute z-10 px-2 py-2 text-xs font-light text-white bg-gray-600 rounded-md whitespace-nowrap bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2">
          {text}
          <svg
            className="absolute text-gray-800 h-2 w-full left-1/2 transform -translate-x-1/2 top-full"
            x="0px"
            y="0px"
            viewBox="0 0 255 255"
          >
            <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
          </svg>
        </div>
      )}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        {children}
      </div>
    </div>
  );
};
