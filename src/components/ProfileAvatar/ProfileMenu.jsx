import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/middlewares/auth";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { uuidShortner } from "../../utils/string";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { faCopy as faCopied } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { config } from "../../../.config";
// import { ThemeProvider } from "../ThemeProvider";

const MenuLink = ({ children, ...props }) => (
  <div
    className="border-t py-2 px-3 font-light text-xs text-gray-600 hover:text-gray-800 flex items-center justify-center cursor-pointer"
    {...props}
  >
    {children}
  </div>
);

export const ProfileMenu = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user.profile);

  const [copied, setCopied] = useState(false);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    history.push("/");
  };

  const handleCopy = () => {
    const formattedURL = `${config.FRONTEND_URL}/user/${user.id}`;
    navigator.clipboard
      .writeText(formattedURL)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500); // Reset copied state after 1.5 seconds
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  return (
    <div className="absolute top-12 right-0 bg-white text-text rounded-sm drop-shadow-lg min-w-36">
      {user && (
        <div className="px-3 pt-2 text-right">
          {user.userName ? (
            <div className="font-semibold text-base">
              <span>{user.userName}</span>
            </div>
          ) : (
            <div className="font-semibold text-base">
              <span>{user.firstName}</span>
              <span> </span>
              <span>{user.lastName}</span>
            </div>
          )}
          <div className="font-light text-xs text-gray-500">{user.email}</div>
          <div
            className="flex gap-1 justify-end items-baseline cursor-pointer my-2"
            onClick={handleCopy}
          >
            <div className="font-light text-xs text-gray-500">
              ID: {uuidShortner(user.id)}
            </div>
            <FontAwesomeIcon
              icon={copied ? faCopied : faCopy}
              style={{ fontSize: "0.75rem", lineHeight: 0 }}
              className={`text-gray-600`}
            />
          </div>
        </div>
      )}
      <MenuLink>
        <Link to="/about-us">About Us</Link>
      </MenuLink>
      <MenuLink>
        <Link to="/how-it-works">How It Works</Link>
      </MenuLink>
      <MenuLink>
        <Link to="/faqs">FAQs</Link>
      </MenuLink>
      {/* <div className="border-t py-3">
        <ThemeProvider />
      </div> */}
      <MenuLink onClick={handleLogout}>Log Out</MenuLink>
    </div>
  );
};
