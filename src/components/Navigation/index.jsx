import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { Avatar } from "../Avatar";

export const Navigation = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user.profile);

  const navLinks = [
    { to: "/", name: "Home" },
    { to: "/signup", name: "Sign Up" },
    { to: "/login", name: "Login" },
    { to: "/professions", name: "Professions" },
    ...(user
      ? [
          { to: "/dashboard", name: "Dashboard" },
          { to: "/account", name: "Account" },
        ]
      : []),
  ];

  const isRouteActive = (routePath) => {
    return location.pathname === routePath;
  };

  return (
    <div className="flex justify-between border-b h-24 items-center px-5">
      <div className="text-4xl font-bold opacity-75 ">
        <span className="text-light-secondary dark:text-dark-secondary">
          prep
        </span>
        <span> </span>
        <span className="text-light-primary dark:text-dark-primary">meet</span>
      </div>
      <div className="flex gap-2">
        <nav className="flex gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              isActive={() => isRouteActive(link.to)}
              className="h-fit px-6 py-2 rounded-lg text-slate-950 dark:text-slate-50"
              activeClassName="bg-light-secondary dark:bg-dark-secondary !text-slate-50 dark:!text-slate-100 font-semibold"
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
        <Avatar url={user.profileImage} />
      </div>
    </div>
  );
};
