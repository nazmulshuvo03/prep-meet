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
    // <nav className="bg-primary pt-20 overflow-hidden h-full w-full">
    //   {navLinks.map((link) => (
    //     <NavLink
    //       key={link.name}
    //       to={link.to}
    //       isActive={() => isRouteActive(link.to)}
    //       className="text-text w-full h-8 flex justify-start items-center gap-2 cursor-pointer text-sm font-medium ml-4 md:ml-10 px-2 !text-gray-700"
    //       activeClassName="bg-background text-gray-700 cursor-default font-semibold"
    //     >
    //       <div className="text-base">{link.icon}</div>
    //       <div>{link.name}</div>
    //     </NavLink>
    //   ))}
    // </nav>
    <nav className="bg-white pt-20 overflow-hidden h-full w-full border-r-2 border-slate-300">
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
  );
};
