import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToastMessage } from "../../store/slices/global";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faLightbulb,
  faThumbsUp,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import "./Toast.css";
import { TOAST_TYPES } from "../../constants/Toast";

const Toast = ({
  message = "Empty Message",
  description = "",
  type = TOAST_TYPES[2],
  onClose = () => {},
}) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
      dispatch(setToastMessage(null));
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const handleClose = () => {
    setVisible(false);
    onClose && onClose();
  };

  const getIcon = () => {
    switch (type) {
      case TOAST_TYPES[0]:
        return (
          <FontAwesomeIcon
            icon={faThumbsUp}
            className="h-8 w-8 text-green-500"
          />
        );
      case TOAST_TYPES[1]:
        return (
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className="h-8 w-8 text-red-500"
          />
        );
      case TOAST_TYPES[2]:
        return (
          <FontAwesomeIcon
            icon={faLightbulb}
            className="h-8 w-8 text-yellow-500"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`fixed bottom-20 left-10 min-w-96 flex items-center z-50 bg-background ${
        visible ? "toast-message-slide-in" : "toast-message-slide-out"
      }`}
    >
      <div className="p-3 w-full rounded-md shadow-md flex items-center">
        <div className="my-auto">{getIcon()}</div>
        <div className="flex-1 px-2">
          <h2 className="text-lg font-semibold">{message}</h2>
          {description && <p>{description}</p>}
        </div>
        {onClose && (
          <button
            onClick={handleClose}
            className="bg-gray-300 hover:bg-gray-400 px-3 py-2 rounded-full"
          >
            <FontAwesomeIcon icon={faX} className="h-4 w-4 " />
          </button>
        )}
      </div>
    </div>
  );
};

export default Toast;
