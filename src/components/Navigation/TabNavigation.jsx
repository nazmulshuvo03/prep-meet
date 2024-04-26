import {
  faLinkedin,
  faSearchengin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faChartLine,
  faCopy,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { ShareProfile } from "../ShareProfile";

export const TabNavigation = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user.profile);

  const navLinks = [
    ...(user
      ? [
          {
            to: "/people",
            name: "Search and Schedule",
            icon: <FontAwesomeIcon icon={faSearchengin} />,
          },
          {
            to: "/profile",
            name: "Profile",
            icon: <FontAwesomeIcon icon={faUser} />,
          },
          {
            to: "/progress",
            name: "Progress",
            icon: <FontAwesomeIcon icon={faChartLine} />,
          },
          {
            to: "/interviews",
            name: "Interviews",
            icon: <FontAwesomeIcon icon={faHeadset} />,
          },
        ]
      : []),
  ];

  const footerLinks = [
    {
      to: "/about-us",
      name: "About Us",
    },
    {
      to: "/how-it-works",
      name: "How it works",
    },
    {
      to: "https://candidacepminterviews.substack.com/",
      name: "Blogs",
      target: "_blank",
    },
    {
      to: "/terms-and-conditions",
      name: "Terms & Conditions",
    },
    {
      to: "/privacy-policy",
      name: "Privacy Policy",
    },
  ];

  const isRouteActive = (routePath) => {
    return location.pathname === routePath;
  };

  return (
    <div className="bg-white pt-20 overflow-hidden h-full w-full border-r-2 border-slate-300 flex flex-col justify-between">
      <nav className="">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.to}
            isActive={() => isRouteActive(link.to)}
            className="text-text w-full h-8 flex justify-start items-center gap-2 cursor-pointer text-sm font-medium pl-4 md:pl-10 px-2 !text-gray-700"
            activeClassName="bg-accent text-gray-700 cursor-default font-semibold"
          >
            <div className="text-base">{link.icon}</div>
            <div>{link.name}</div>
          </NavLink>
        ))}
      </nav>
      <div className="px-2 py-4">
        <div className="flex items-center justify-center">
          <div className="flex gap-2">
            <NavLink to="">
              <FontAwesomeIcon icon={faXTwitter} />
            </NavLink>
            <NavLink
              to={{
                pathname:
                  "https://www.linkedin.com/company/candidace-fyi/about",
              }}
              target="_blank"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </NavLink>
            <ShareProfile />
          </div>
        </div>
        <nav className="flex gap-2 flex-wrap py-3 items-center justify-center">
          {footerLinks.map((link) => (
            <NavLink
              key={link.name}
              to={{ pathname: link.to }}
              target={link.target || ""}
              isActive={() => isRouteActive(link.to)}
              className=""
              activeClassName=""
            >
              <div className="text-xs underline font-medium">{link.name}</div>
            </NavLink>
          ))}
        </nav>
        <div className="text-xs font-light text-center">
          <div>© 2024 Candidace.fyi.</div>
          <div>All rights reserved.</div>
        </div>
      </div>
    </div>
  );
};
