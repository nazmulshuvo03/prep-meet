import { faFacebook, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

export const Footer = () => {
  return (
    <div
      className="h-72 flex flex-col justify-center bg-white"
      style={{ paddingLeft: "5%", paddingRight: "5%" }}
    >
      <div className="flex flex-col md:flex-row gap-2 items-center border-b-2 border-gray-800 pb-10">
        <div className="text-3xl font-semibold opacity-75 ">
          <NavLink to={"/"} className="text-gray-900">
            Candidace
          </NavLink>
        </div>
        <div className="flex-1 flex items-center justify-center gap-6 text-sm font-semibold">
          <NavLink to={""}>Contact Us</NavLink>
          <NavLink to={""}>FAQ</NavLink>
          <NavLink to={""}>Support</NavLink>
        </div>
        <div className="flex gap-4">
          <FontAwesomeIcon icon={faFacebook} />
          <FontAwesomeIcon icon={faX} />
          <FontAwesomeIcon icon={faLinkedin} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-4 py-4 text-xs">
        <div className="text-center md:text-start">
          © 2024 Candidace.fyi. All rights reserved.
        </div>
        <div className="flex gap-4">
          <NavLink to={""} className="underline">
            Privacy Policy
          </NavLink>
          <NavLink to={""} className="underline">
            Terms and Conditions
          </NavLink>
          <NavLink to={""} className="underline">
            Cookie Policy
          </NavLink>
        </div>
      </div>
    </div>
  );
};