import { faSearchengin } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faChartLine, faHeadset } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useHistory } from "react-router-dom";

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

  const isRouteActive = (routePath) => {
    return location.pathname === routePath;
  };

  return (
    <nav
      className="bg-primary pt-20 overflow-hidden hidden md:block"
      style={{ width: "17vw" }}
    >
      {navLinks.map((link) => (
        <NavLink
          key={link.name}
          to={link.to}
          isActive={() => isRouteActive(link.to)}
          className="text-text w-full h-8 flex justify-start items-center gap-2 cursor-pointer text-sm font-medium ml-10 pl-2 !text-gray-700"
          activeClassName="bg-background text-gray-700 w-full h-8 flex justify-start items-center cursor-pointer text-sm font-semibold ml-10 pl-2"
        >
          <div className="text-base">{link.icon}</div>
          <div>{link.name}</div>
        </NavLink>
      ))}
    </nav>
  );
};
