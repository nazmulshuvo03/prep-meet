import { useSelector } from "react-redux";
import { NavLink, useLocation, useHistory } from "react-router-dom";

export const TabNavigation = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user.profile);

  const navLinks = [
    ...(user
      ? [
          { to: "/profile", name: "Profile" },
          { to: "/people", name: "Search and Schedule" },
          { to: "/progress", name: "My Progress" },
          { to: "/interviews", name: "My Interviews" },
        ]
      : []),
  ];

  const isRouteActive = (routePath) => {
    return location.pathname === routePath;
  };

  return (
    <nav className="bg-primary pt-20" style={{ width: "17vw" }}>
      {navLinks.map((link) => (
        <NavLink
          key={link.name}
          to={link.to}
          isActive={() => isRouteActive(link.to)}
          className="text-text w-full h-8 flex justify-start items-center cursor-pointer text-sm font-semibold ml-10 pl-2"
          activeClassName="bg-background text-gray-700 w-full h-8 flex justify-start items-center cursor-pointer text-sm font-semibold ml-10 pl-2"
        >
          {link.name}
        </NavLink>
      ))}
    </nav>
  );
};
