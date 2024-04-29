import { faSearchengin } from "@fortawesome/free-brands-svg-icons";
import { faCalendarDays, faUser } from "@fortawesome/free-regular-svg-icons";
import { faChartLine, faHeadset } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { LoggedFooter } from "../Footer/LoggedFooter";

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
            to: "/availability",
            name: "Schedule",
            icon: <FontAwesomeIcon icon={faCalendarDays} />,
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
      <LoggedFooter />
    </div>
  );
};
