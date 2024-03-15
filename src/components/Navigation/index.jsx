import { useSelector, useDispatch } from "react-redux";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { Button } from "../Button";
import { logoutUser } from "../../store/middlewares/auth";
// import { Banner } from "../Banner";

export const Navigation = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthenticated = useSelector((state) => state.global.isAuthenticated);

  const isDashboard = () => {
    const dashboardRoutes = ["/people", "/profile", "/progress", "/interviews"];
    return dashboardRoutes.includes(location.pathname);
  };

  const navLinks = [
    ...(isDashboard()
      ? []
      : [
          { to: "/about-us", name: "About Us" },
          { to: "/how-it-works", name: "How it works" },
          { to: "/faqs", name: "FAQs" },
          ...(isAuthenticated
            ? [
                {
                  to: "/people",
                  name: "Search & Schedule",
                },
              ]
            : []),
        ]),
  ];

  // const isRouteActive = (routePath) => {
  //   return location.pathname === routePath;
  // };

  const handleLoginClick = () => {
    history.push({
      search: "?auth=login",
    });
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    history.push("/");
  };

  return (
    <>
      {/* <Banner
        text={
          "This website is currently under active construction. Please inform us of any anomalies or issues you encounter. Thank you for your patience."
        }
      /> */}
      <div className="bg-primary flex justify-between w-full h-full items-center px-5">
        <div className="text-3xl font-semibold opacity-75 ">
          <NavLink to={"/"} className="text-gray-900">
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
          {isAuthenticated ? (
            <Button
              className={
                "border border-gray-700 !bg-white rounded-none !font-light !text-gray-700"
              }
              onClick={handleLogout}
            >
              Sign Out
            </Button>
          ) : (
            <Button
              className={
                "border border-gray-700 !bg-secondary rounded-none !font-normal !text-white"
              }
              onClick={handleLoginClick}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
