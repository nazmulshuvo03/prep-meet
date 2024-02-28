import { useSelector, useDispatch } from "react-redux";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { Button } from "../Button";
import { logoutUser } from "../../store/middlewares/auth";

export const Navigation = () => {
  // const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user.profile);

  const navLinks = [
    ...(user
      ? [
          { to: "/dashboard", name: "About Us" },
          { to: "/dashboard", name: "How it works" },
          { to: "/dashboard", name: "FAQs" },
        ]
      : []),
  ];

  // const isRouteActive = (routePath) => {
  //   return location.pathname === routePath;
  // };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    history.push("/");
  };

  return (
    <div className="bg-primary flex justify-between w-full h-full items-center px-5">
      <div className="text-3xl font-semibold opacity-75 ">
        <NavLink to={"/dashboard"} className="text-gray-900">
          Candidace
        </NavLink>
      </div>
      <div className="flex gap-8 items-center">
        <nav className="flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              // isActive={() => isRouteActive(link.to)}
              className="h-fit rounded-lg text-slate-950 dark:text-slate-50"
              // activeClassName="bg-secondary !text-slate-50 dark:!text-slate-100 font-semibold"
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
        <Button
          className={
            "border border-gray-700 !bg-white rounded-none !font-light !text-gray-700"
          }
          onClick={handleLogout}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};
